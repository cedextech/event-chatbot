const unrecognized = {
    entities: [],
    intent: null,
    intents: [],
    score: 0
};

const parse = {
    parse: function(context, text) {
        if (text === null) {
            return unrecognized;
        }

        try {
            var payload_text = JSON.parse(text);
        } catch (ex) {
            var payload_text = text;
        }

        if (payload_text.action === 'Partner.Category') {
            return {
                entities: [{
                    entity: payload_text.entity,
                    type: 'Id',
                    score: 1,
                }],
                intent: payload_text.action,
                score: 1
            };
        }

        return {
            intent: payload_text,
            score: 1
        };
    }
};

module.exports = {
    recognize: function(session, callback) {
        if (session.message.sourceEvent.message.quick_reply !== undefined) {
            const text = session.message.sourceEvent.message.quick_reply.payload;
            callback.call(null, null, parse.parse(session, text));
        } else {
            callback.call(null, null, parse.parse(session, null));
        }
    }
};