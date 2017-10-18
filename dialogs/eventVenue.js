var eventData = require('../services/data.js');

module.exports = function(bot) {
    bot.dialog('/EventVenue', [
        function(session, args, next) {
            var venue = eventData.getVenue();

            session.sendTyping();
            session.send("The event happens here...");
            session.endDialog(venue);
        }
    ]);
}