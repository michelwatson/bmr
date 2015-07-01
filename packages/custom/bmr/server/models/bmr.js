'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * BMR Schema
 */
var BmrSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  bodyFat: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */

BmrSchema.path('gender').validate(function(gender) {
  return !!gender;
}, 'Gender cannot be blank');

BmrSchema.path('age').validate(function(age) {
  return !!age;
}, 'Age cannot be blank');

BmrSchema.path('bodyFat').validate(function(bodyFat) {
  return !!bodyFat;
}, 'Body fat percentage cannot be blank or zero');

BmrSchema.path('height').validate(function(height) {
  return !!height;
}, 'Height percentage cannot be blank or zero');

BmrSchema.path('weight').validate(function(weight) {
  return !!weight;
}, 'Weight cannot be blank or zero');
/**
 * Statics
 */
BmrSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
BmrSchema.statics.loadByUser = function(id, cb) {
  this.findOne({
    user: id
  }).populate('user', 'name username').exec(cb);
};
mongoose.model('Bmr', BmrSchema);
