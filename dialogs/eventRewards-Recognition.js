var eventData = require('../services/data.js');
var builder = require('botbuilder');
var quickReplies = require('botbuilder-quickreplies');

module.exports = function(bot) {
    bot.dialog('/EventRewardsRecognition', [
        function(session, args, next) {
            session.sendTyping();

            var rewardsRecognition = eventData.getRewardsAndRecognition();

            if (args.intent === 'Event.Rewards-Recognition') {
                var message = new builder.Message(session).text("Are you a Student or Professional?");

                quickReplyMessage = quickReplies.AddQuickReplies(session, message, [
                    new quickReplies.QuickReplyText('Student', 'Student.Prizes'),
                    new quickReplies.QuickReplyText('Professional', 'Professional.Prizes')
                ]);

                session.send(quickReplyMessage);
            }

            if (args.intent === 'Student.Prizes') {
                var prizes = rewardsRecognition.student_category;
                var cards = [];

                prizes.forEach(function(prize) {

                    var card = new builder.HeroCard(session)
                        .title(prize.name)
                        .text(prize.price)
                        .images([builder.CardImage.create(session, prize.image)]);

                    cards.push(card);
                });

                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                session.send("Rewards for students are...");
                session.send(reply);
            }

            if (args.intent === 'Professional.Prizes') {
                var prizes = rewardsRecognition.professional_category;
                var cards = [];

                prizes.forEach(function(prize) {
                    var card = new builder.HeroCard(session)
                        .title(prize.name)
                        .text(prize.price)
                        .images([builder.CardImage.create(session, prize.image)]);

                    cards.push(card);
                });

                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                session.send("Rewards for professionals are...");
                session.send(reply);
            }

            session.endDialog();
        }
    ]);
}