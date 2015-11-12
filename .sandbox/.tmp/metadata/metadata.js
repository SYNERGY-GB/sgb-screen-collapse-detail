///<reference path="megazord.d.ts"/>
var screens = require('./screens');
var languages = require('./languages');
var routes = require('./routes');
var settings = require('./settings');
var screenConfig = screens.screens;
var languageConfig = languages.languages;
var routerConfig = routes.routes;
var settingsConfig = settings.settings;
var metadata = {
    screens: screenConfig,
    languages: languageConfig,
    routes: routerConfig,
    settings: settingsConfig
};
module.exports = metadata;
