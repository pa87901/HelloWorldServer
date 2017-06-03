'use strict';
const express = require('express');
const router = express.Router();
const SpecialtyController = require('../controllers').Specialty;

router.route('/')
  .post(SpecialtyController.updateSpecialties)
  ;

router.route('/delete/:facebookId/:specialty')
  .delete(SpecialtyController.deleteSpecialties)
  ;
  
router.route('/:id')
  .get(SpecialtyController.getSpecialties)
  ;

module.exports = router;