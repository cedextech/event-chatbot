var eventData = require('../services/data.js');
var builder = require('botbuilder');
var quickReplies = require('botbuilder-quickreplies');

module.exports = function(bot) {
    bot.dialog('/EventThemes', [
        function(session, args, next) {

            session.sendTyping();

            var themes = eventData.getThemes();

            if (args.intent === 'Event.Themes') {
                var message = new builder.Message(session).text(themes.description);

                quickReplyMessage = quickReplies.AddQuickReplies(session, message, [
                    new quickReplies.QuickReplyText('Banking', 'Theme.Banking'),
                    new quickReplies.QuickReplyText('Technology', 'Theme.Technology')
                ]);

                session.send(quickReplyMessage);
            }

            if (args.intent === 'Theme.Banking') {
                var categoryThemes = themes['categories'][0]['options'];
                var cards = [];

                categoryThemes.forEach(function(theme) {

                    var card = new builder.HeroCard(session)
                        .title(theme.name)
                        .text(theme.description)
                        .buttons([builder.CardAction.openUrl(session, theme.apply_url, 'Apply Now')]);

                    cards.push(card);
                });

                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                session.send("Themes of Banking category are...");
                session.send(reply);
            }

            if (args.intent === 'Theme.Technology') {
                var categoryThemes = themes['categories'][1]['options'];
                var cards = [];

                categoryThemes.forEach(function(theme) {
                    var card = new builder.HeroCard(session)
                        .title(theme.name)
                        .text(theme.description)
                        .buttons([builder.CardAction.openUrl(session, theme.apply_url, 'Apply Now')]);

                    cards.push(card);
                });

                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                session.send("Themes of Technology category are...");
                session.send(reply);
            }

            session.endDialog();
        }
    ]);
}