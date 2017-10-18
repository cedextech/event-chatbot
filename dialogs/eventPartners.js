var eventData = require('../services/data.js');
var builder = require('botbuilder');
var quickReplies = require('botbuilder-quickreplies');

module.exports = function(bot) {
    bot.dialog('/EventPartners', [
        function(session, args, next) {
            session.sendTyping();

            var partners = eventData.getPartners();

            if (args.intent === 'Event.Partners') {
                var message = new builder.Message(session).text('Which type of partner you want to see?');
                var replies = [];

                for (var i = 0; i < partners.length; i++) {
                    var buttonAction = JSON.stringify({
                        'action': 'Partner.Category',
                        'entity': partners[i]['category_id']
                    });

                    var reply = new quickReplies
                        .QuickReplyText(partners[i]['category_name'], buttonAction);

                    replies.push(reply);
                }

                replyMessage = quickReplies.AddQuickReplies(session, message, replies);
                session.send(replyMessage);
            }

            if (args.intent === 'Partner.Category') {
                var categoryId = args.entities[0]['entity'];

                partners.forEach(function(partner) {

                    if (partner.category_id == categoryId) {
                        var categoryPartners = partner.partners_by_category;
                        var cards = [];

                        categoryPartners.forEach(function(category_partner) {

                            var card = new builder.HeroCard(session)
                                .title(category_partner.name)
                                .images([builder.CardImage.create(session, category_partner.image)]);

                            cards.push(card);
                        });

                        var reply = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments(cards);

                        session.send("Here is the list of partners we have.");
                        session.send(reply);
                    }
                });
            }

            session.endDialog();
        }
    ]);
}