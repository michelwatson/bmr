'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Bmr = mongoose.model('Bmr'),
  User = mongoose.model('User'),
  _ = require('lodash');

module.exports = function(Bmrs) {

    return {
      /**
       * Find bmr by username
       */
      username: function(req, res, next, name) {
        var user = User.find().where('username').equals(name);
        Bmr.loadByUser(user.username, function(err, bmr) {
          if (err) return next(err);
          if (!bmr) return next(new Error('Failed to load bmr ' + name));
          req.bmr = bmr;
          next();
        })
      },
        /**
        * Find bmr by id
        */
        bmr: function(req, res, next, id) {
            Bmr.load(id, function(err, bmr) {
                if (err) return next(err);
                if (!bmr) return next(new Error('Failed to load bmr ' + id));
                req.bmr = bmr;
                next();
            });
        },
        /**
        * Create a BMR
        */
        create: function(req, res) {
            var bmr = new Bmr(req.body);
            bmr.user = req.user;
          var gender = bmr.gender;
          var age = bmr.age;
          var bf = bmr.bodyFat;
          var height = bmr.height;
          var weight = bmr.weight;
          var maleTypicalWeight = (1.15 * weight * ((100 - bf) / 100));
          var femaleTypicalWeight = (1.20 * weight * ((100 - bf) / 100));

          var estimateMaleBmr = (66 + ( 6.23 * maleTypicalWeight ) + ( 12.70 * height ) - ( 6.80 * age ));
          var estimateFemaleBmr = (655 + ( 4.35 * femaleTypicalWeight ) + ( 4.70 * height ) - ( 4.70 * age ));

          if (gender === 'MALE' || gender === 'male') {
            bmr.rate = estimateMaleBmr;
          }
          if (gender === 'FEMALE' || gender === 'female') {
            bmr.rate = estimateFemaleBmr;
          }



            bmr.save(function(err) {
                if (err) {
                  return res.status(500).json({
                    error: 'Cannot save the BMR ' +err
                  });
                }

                Bmr.events.publish('create', {
                    description: ' created ' + ' BMR.'
                });

                res.json(bmr);
            });
        },
        /**
        * Update a BMR
        */
        update: function(req, res) {
            var bmr = req.article;

            bmr = _.extend(bmr, req.body);


            bmr.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the BMR'
                    });
                }

                Articles.events.publish('update', {
                    description: req.user.name + ' updated ' + req.body.title + ' BMR.'
                });

                res.json(bmr);
            });
        },
        /**
        * Delete an article
        */
        destroy: function(req, res) {
            var bmr = req.bmr;


            bmr.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the BMR'
                    });
                }

                Bmrs.events.publish('remove', {
                    description: req.user.name + ' deleted ' + bmr.user.name + '\'s BMR.'
                });

                res.json(bmr);
            });
        },
        /**
        * Show an article
        */
        show: function(req, res) {

            Bmrs.events.publish('view', {
                description: req.user.name + ' read ' + req.bmr.user.name + '\'s BMR.'
            });

            res.json(req.article);
        },
        /**
        * List of Articles
        */
        all: function(req, res) {
            Bmr.find().sort('-created').populate('user', 'name username').exec(function(err, bmrs) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the articles'
                    });
                }

                res.json(bmrs);
            });
        }
    };
}