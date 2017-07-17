import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp'; // this is the meteor serverr
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  //parameter function is explicitly chosen not to be an arrow function.
  Meteor.publish('links', function() {
    return Links.find({});

  });
});

// use adds a middleware

// WebApp.connectHandlers
//   .use(req => console.log(req));
