'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Bmr, app, auth, database) {

  app.get('/api/bmr/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/bmr/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/bmr/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/bmr/example/render', function(req, res, next) {
    Bmr.render('index', {
      package: 'bmr'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
module.exports = function(Bmrs, app, auth) {

  var bmrs = require('../controllers/bmrs')(Bmrs);

  app.route('/api/bmrs')
    .get(bmrs.all)
    .post(bmrs.create);
  app.route('/api/bmrs/:bmrId')
    .get(auth.isMongoId, bmrs.show)
    .put(auth.isMongoId, bmrs.update)
    .delete(auth.isMongoId,  bmrs.destroy);

  // Finish with setting up the articleId param
  app.param('bmrId', bmrs.username);
};