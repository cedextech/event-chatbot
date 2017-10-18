var eventData = require('../services/data.js');

module.exports = function(bot) {
    bot.dialog('/HelpUser', [
        function(session, args, next) {
            session.sendTyping();
            session.send(eventData.getEventAbout());
            session.send(eventData.getMoreAboutEvent());
            session.send("You can browse through the menu on the left side of the chat window to know more.");
            session.endDialog();
        }
    ]);
}