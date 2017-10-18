const unrecognized = {
    entities: [],
    intent: null,
    intents: [],
    score: 0
};

const parse = {
    parse: function(context, payload) {
        if (payload === null) {
            return unrecognized;
        }

        try {
            var payload = JSON.parse(payload);
        } catch (ex) {

        }

        if (payload.action === 'TimelineDetails' || payload.action === 'ParticipateDetails') {
            return {
                entities: [{
                    entity: payload.entity,
                    type: 'Id',
                    score: 1,
                }],
                intent: payload.action,
                score: 1
            };
        }

        return {
            intent: payload,
            score: 1
        };
    }
}

module.exports = {
    recognize: function(context, callback) {
        if (context.message.sourceEvent.postback !== undefined) {
            const payload = context.message.sourceEvent.postback.payload;
            callback.call(null, null, parse.parse(context, payload));
        } else {
            callback.call(null, null, parse.parse(context, null));
        }
    }
};