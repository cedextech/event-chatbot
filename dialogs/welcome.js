var quickReplies = require('botbuilder-quickreplies');
var builder = require('botbuilder');

module.exports = function(bot) {
    bot.dialog('/GetStarted', [
        function(session, args, next) {
            var message = new builder.Message(session)
                .text('Hello ' + session.message.user.name + ', welcome to DCB Bank Innovation Carnival.');

            session.sendTyping();

            quickReplyMessage = quickReplies.AddQuickReplies(session, message, [
                new quickReplies.QuickReplyText('About Us', 'Event.About'),
                new quickReplies.QuickReplyText('Why Participate', 'Event.Participate')
            ]);

            session.send(quickReplyMessage);
            session.endDialog();
        }
    ]);
}