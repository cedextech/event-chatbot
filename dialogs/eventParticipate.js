var eventData = require('../services/data.js');
var builder = require('botbuilder');

module.exports = function(bot) {
    bot.dialog('/EventParticipate', [
        function(session, args, next) {
            var participates = eventData.getParticipates();
            var cards = [];

            session.sendTyping();

            if (args.intent === 'Event.Participate') {
                participates.forEach(function(participate) {
                    var postBackAction = JSON.stringify({
                        'action': 'ParticipateDetails',
                        'entity': participate.id
                    });

                    var card = new builder.HeroCard(session)
                        .title(participate.category)
                        .text(participate.description)
                        .images([builder.CardImage.create(session, participate.image)])
                        .buttons([builder.CardAction.postBack(session, postBackAction, 'View details')]);

                    cards.push(card);
                });

                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                session.send("Whether you are a student, an expert, a startup or a developer, here is a chance to express your ideas.");
                session.send(reply);
            }

            if (args.intent === 'ParticipateDetails') {
                participates.forEach(function(participate) {
                    if (participate.id == args.entities[0]['entity']) {
                        session.send(participate.description);
                    }
                });
            }

            session.endDialog();
        }
    ]);
}