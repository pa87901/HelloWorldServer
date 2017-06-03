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

module.exports.getSpecialties = (req, res) => {
  models.User.where({facebook_id: req.params.id}).fetch({columns: ['id']})
  .then(result => {
    models.Guide.where({user_id: result.id}).count()
    .then(result2 => {
      if (result2 === '0') {
        models.Guide.forge({user_id: result.id})
        .save()
        .then(result3 => {
          console.log('Successfully created a guide!');
          models.Guide.where({user_id: result.id})
          .fetchAll({
            withRelated: [
              {
                'guideSpecialties.specialty': function(qb) {
                  qb.select();
                }
              }
            ]
          })
          .then(specialties => {
            console.log('Successfully retrieved specialties.');
            res.status(200).send(specialties);
          });
        });
      } else {
        models.Guide.where({user_id: result.id})
        .fetchAll({
          withRelated: [
            {
              'guideSpecialties.specialty': function(qb) {
                qb.select();
              }
            }
          ]
        })
        .then(specialties => {
          console.log('Successfully retrieved specialties.');
          res.status(200).send(specialties);
        });
      }
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(err => {
    console.log('There is an error retrieving specialties.', err);
    res.sendStatus(404);
  });
};