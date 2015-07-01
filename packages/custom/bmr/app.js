'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Bmr = new Module('bmr');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Bmr.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Bmr.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Bmr.menus.add({
    title: 'bmr example page',
    link: 'bmr example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Bmr.aggregateAsset('css', 'bmr.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Bmr.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Bmr.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Bmr.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Bmr;
});
