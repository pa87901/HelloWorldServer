'use strict';
const express = require('express');
const router = express.Router();
const GuideSpecialtyController = require('../controllers').GuideSpecialty;

router.route('/')
  .post(GuideSpecialtyController.createGuideSpecialty);

module.exports = router;