module.exports = function(bot) {
    bot.dialog('/ConfusedResponse', [
        function(session, args, next) {
            session.sendTyping();

            if (session.message.text.trim()) {
                session.endDialog('Sorry, I didn\'t understand you or maybe just lost track of our conversation');
            } else {
                session.endDialog('Sorry, I didn\'t understand you');
            }
        }
    ]);
}