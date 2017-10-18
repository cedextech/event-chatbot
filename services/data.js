var eventData = require('../data');

module.exports = {

    /**
     * Get the Mentors
     *
     * @return {[type]} [description]
     */
    getMentors: function() {
        return eventData['mentors'];
    },

    /**
     * Get the Participates
     *
     * @return {[type]} [description]
     */
    getParticipates: function() {
        return eventData['why_participate'];
    },

    /**
     * Get the Partners
     *
     * @return {[type]} [description]
     */
    getPartners: function() {
        return eventData['partners'];
    },

    /**
     * Get the RewardsAndRecognition
     *
     * @return {[type]} [description]
     */
    getRewardsAndRecognition: function() {
        return eventData['rewards_recognition'];
    },

    /**
     * Get the Themes
     *
     * @return {[type]} [description]
     */
    getThemes: function() {
        return eventData['Themes'];
    },

    /**
     * Get the Timeline
     *
     * @return {[type]} [description]
     */
    getTimeline: function() {
        return eventData['timeline'];
    },

    /**
     * Get the Venue
     *
     * @return {[type]} [description]
     */
    getVenue: function() {
        return eventData['venue'];;
    },

    /**
     * Get the event details
     *
     * @return {[type]} [description]
     */
    getEventAbout: function() {
        return eventData['about'];
    },

    /**
     * Get more about the event
     *
     * @return {[type]} [description]
     */
    getMoreAboutEvent: function() {
        return eventData['about_more'];
    }
}