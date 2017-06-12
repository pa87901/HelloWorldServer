const session = require('express-session');
//const RedisStore = require('connect-redis')(session);
//const redisClient = require('redis').createClient();
const JWT = require('jwt-async');
const secret = require('../../config/secrets.js').AUTH0_SECRET;

var jwt = new JWT();
jwt.setSecret(secret);

module.exports.verify = function verify(req, res, next) {
  req.jwt_auth = false;
  if(req.headers['authorization']){
    var jwt_token = req.headers['authorization'];
    jwt.verify(jwt_token, function(err, jwt_data) {
      if(err){
        throw err;
      } else {
        req.jwt_auth = jwt_data;
        next();
      }
    });
  } else {
    next();
  }
};

// module.exports.session = session({
//   store: new RedisStore({
//     client: redisClient,
//     host: 'localhost',
//     port: 6379
//   }),
//   secret: 'more laughter, more love, more life',
//   resave: false,
//   saveUninitialized: false
// });
