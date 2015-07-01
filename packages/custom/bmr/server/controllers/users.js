'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  async = require('async'),
  config = require('meanio').loadConfig(),
  crypto = require('crypto'),
  nodemailer = require('nodemailer'),
  templates = require('../template'),
  _ = require('lodash'),
  jwt = require('jsonwebtoken');
/**
 * Find user by username
 */
module.exports = function() {
  return {
    userByName: function (req, res, next, name) {
      User.findOne({
        username: name
      }).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + name));
        req.profile = user;
        next();
      });
    }
  }};