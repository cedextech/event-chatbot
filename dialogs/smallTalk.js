module.exports = function(bot) {
    bot.dialog('/SmallTalk', [
        function(session, args, next) {
            session.sendTyping();
            session.endDialog(args['entities'][0]['entity']);
        }
    ]);
}