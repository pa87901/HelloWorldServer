const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    if(req.jwt_auth && req.jwt_auth.claims.exp > Math.floor(Date.now()/1000)){
      req.body.username = req.jwt_auth.claims.sub;
      console.log('Verified', req.jwt_auth);
    } else {
      req.body.username = null;
      console.log('Not Verified');
    }
  });

router.route('/')
  .post(middleware.auth.verify, (req, res) => {
    if(req.jwt_auth && req.jwt_auth.claims.exp > Math.floor(Date.now()/1000)){
      req.body.username = req.jwt_auth.claims.sub;
      console.log('Verified', req.jwt_auth);
    } else {
      req.body.username = null;
      console.log('Not Verified');
    }
  });


module.exports = router;


/* 
How are we using the user name?
How are we handling rejected usernames?
 */