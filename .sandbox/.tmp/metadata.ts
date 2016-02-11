///<reference path="megazord.d.ts"/>

import screens = require('./screens');
import languages = require('./languages');
import routes = require('./routes');
import settings = require('./settings');

var screenConfig : Megazord.ContainerScreenList = screens.screens;
var languageConfig : Megazord.LanguageConfig = languages.languages;
var routerConfig : Megazord.RouterConfig = routes.routes;
var settingsConfig : Megazord.GlobalConfig = settings.settings;

var metadata = {
  screens: screenConfig,
  languages: languageConfig,
  routes: routerConfig,
  settings: settingsConfig
};

export = metadata;
