const models = require('../../db/models');

module.exports.createSpecialty = (req, res) => {
  models.Specialty.forge({specialty: req.body.specialty})
    .save()
    .then(result => {
      res.status(200).send();
      console.log('Successfully created specialty!!');
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch((error) => {
      console.log('There is an error creating specialty.', error);
      res.sendStatus(404);
    });
};