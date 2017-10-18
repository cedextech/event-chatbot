var eventData = require('../services/data.js');
var builder = require('botbuilder');

module.exports = function(bot) {
    bot.dialog('/EventTimeline', [
        function(session, args, next) {
            session.sendTyping();

            var timelines = eventData.getTimeline();

            if (args.intent === 'Event.Timeline') {
                var cards = [];

                timelines.forEach(function(timeline) {
                    var postBackAction = JSON.stringify({
                        'action': 'TimelineDetails',
                        'entity': timeline.id
                    });

                    var card = new builder.HeroCard(session)
                        .title(timeline.name)
                        .text(timeline.description)
                        .images([builder.CardImage.create(session, timeline.image)])
                        .buttons([builder.CardAction.postBack(session, postBackAction, 'View details')]);

                    cards.push(card);
                });

                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                session.send("DCB Innovation Carnival will be conducted in 3 phases.");
                session.send(reply);
            }

            if (args.intent === 'TimelineDetails') {
                timelines.forEach(function(timeline) {
                    if (timeline.id == args.entities[0]['entity']) {
                        session.send(timeline.description);
                    }
                });
            }

            session.endDialog();
        }
    ]);
}