import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
//check runs validation on variable. validate does nothing. otherwise js error
//checkmethod build in validations
// Match allows to run a custom validator function
import { check, Match } from 'meteor/check';

Meteor.methods({
  //everything concerning methods goes inside here

  'links.insert': function(url) {
///**    console.log('attempting to save', url);
    check(url, Match.Where(url => validUrl.isUri(url)));
// We are ready to save shit
    const token = Math.random().toString(36).slice(-5);
    Links.insert({url, token, clicks: 0});
  }
});

export const Links = new Mongo.Collection('links');
