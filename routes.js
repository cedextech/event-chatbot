const dialogs = {
    GetStarted: require('./dialogs/welcome'),
    HelpUser: require('./dialogs/helpUser'),
    SmallTalk: require('./dialogs/smallTalk'),
    EventMentors: require('./dialogs/eventMentors'),
    EventPartners: require('./dialogs/eventPartners'),
    EventVenue: require('./dialogs/eventVenue'),
    EventTimeline: require('./dialogs/eventTimeline'),
    EventParticipate: require('./dialogs/eventParticipate'),
    EventRewardsRecognition: require('./dialogs/eventRewards-Recognition'),
    EventThemes: require('./dialogs/eventThemes'),
    ConfusedResponse: require('./dialogs/confusedResponse')
};

module.exports = {
    route: function(intents, bot) {
        intents.matches('GetStarted', '/GetStarted');
        intents.matches('SmallTalk', '/SmallTalk');
        intents.matches('Event.About', '/HelpUser');
        intents.matches('Event.Mentors', '/EventMentors');
        intents.matches('Event.Partners', '/EventPartners');
        intents.matches('Partner.Category', '/EventPartners');
        intents.matches('Event.Venue', '/EventVenue');
        intents.matches('Event.Timeline', '/EventTimeline');
        intents.matches('TimelineDetails', '/EventTimeline');
        intents.matches('Event.Participate', '/EventParticipate');
        intents.matches('ParticipateDetails', '/EventParticipate');
        intents.matches('Event.Rewards-Recognition', '/EventRewardsRecognition');
        intents.matches('Student.Prizes', '/EventRewardsRecognition');
        intents.matches('Professional.Prizes', '/EventRewardsRecognition');
        intents.matches('Event.Themes', '/EventThemes');
        intents.matches('Theme.Banking', '/EventThemes');
        intents.matches('Theme.Technology', '/EventThemes');
        intents.onDefault('/ConfusedResponse');

        bot.dialog('/', intents);

        dialogs.GetStarted(bot);
        dialogs.HelpUser(bot);
        dialogs.SmallTalk(bot);
        dialogs.EventMentors(bot);
        dialogs.EventPartners(bot);
        dialogs.EventVenue(bot);
        dialogs.EventTimeline(bot);
        dialogs.EventParticipate(bot);
        dialogs.EventRewardsRecognition(bot);
        dialogs.EventThemes(bot);
        dialogs.ConfusedResponse(bot);
    }
}