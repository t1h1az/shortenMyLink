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

function onRoute(req, res, next) {
  //take the token out of the url and find
  //matching link in the link collection
  const link = Links.findOne({token: req.params.token});

  //If we find a link token, take the user to the long url
  if (link) {
    Links.update(link, {$inc: {clicks: 1}});
    res.writeHead(307, {'Location' : link.url});
    res.end();
  } else {
    next();
  //If we don't find a token, take us to our normal react App#
  }
}
// /localhost:3000/ no Match
// /localhost:3000/peanutbutter
const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});
// use adds a middleware

WebApp.connectHandlers.use(middleware);
