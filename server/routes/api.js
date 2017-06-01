'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    console.log(req)
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log(req)
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
