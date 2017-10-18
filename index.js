require('dotenv').config();

var router = require('./routes.js');
var builder = require('botbuilder');
var restify = require('restify');
var quickReplies = require('botbuilder-quickreplies');
var apiaiRecognizer = require('./recognizers/api-ai-recognizer');
var postbackRecognizer = require('./recognizers/postback_recognizer');
var quickreplyRecognizer = require('./recognizers/quickreply_recognizer');

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector, {
    persistConversationData: true
});

bot.use(quickReplies.QuickRepliesMiddleware);
bot.use(builder.Middleware.sendTyping());

var intents = new builder.IntentDialog({
    recognizers: [
        postbackRecognizer,
        quickreplyRecognizer,
        new apiaiRecognizer(process.env.API_TOKEN)
    ],
    intentThreshold: 0.2,
    recognizeOrder: builder.RecognizeOrder.series
});

router.route(intents, bot);

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4000, function() {
    console.log('%s listening to %s', server.name, server.url);
});

server.post('/api/messages', connector.listen());