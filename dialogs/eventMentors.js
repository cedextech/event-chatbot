var eventData = require('../services/data.js');
var builder = require('botbuilder');

module.exports = function(bot) {
    bot.dialog('/EventMentors', [
        function(session, args, next) {
            session.sendTyping();

            var mentors = eventData.getMentors();
            var cards = [];

            mentors.forEach(function(mentor) {
                var card = new builder.HeroCard(session)
                    .title(mentor.name)
                    .text(mentor.about)
                    .images([builder.CardImage.create(session, mentor.image)]);

                cards.push(card);
            });

            var reply = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(cards);

            session.send("We have the following mentors");
            session.endDialog(reply);
        }
    ]);
}