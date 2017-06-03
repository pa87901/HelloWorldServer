const models = require('../../db/models');

module.exports.updateSpecialties = (req, res) => {
  models.Specialty.where({specialty: req.body.specialty}).fetch({columns: ['id']})
  .then(result => {
    if (!result) {
      models.Specialty.forge({specialty: req.body.specialty})
      .save()
      .then(result2 => {
        console.log('Successfully created specialty!');
        models.Specialty.where({specialty: req.body.specialty}).fetch({columns: ['id']})
        .then(result3 => {
          models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
          .then(result4 => {
            models.Guide.where({user_id: result4.id}).fetch({columns: ['id']})
            .then(result5 => {
              models.GuideSpecialty.forge({guide_id: result5.id, specialty_id: result3.id})
              .save()
              .then(result6 => {
                res.status(200).send();
                console.log('Successfully created guideSpecialty!');
              });
            });
          });
        });
      });
    } else {
      models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
      .then(result7 => {
        models.Guide.where({user_id: result7.id}).fetch({columns: ['id']})
        .then(result8 => {
          models.GuideSpecialty.where({guide_id: result8.id, specialty_id: result.id}).fetch({columns: ['id']})
          .then(result9 => {
            if (!result9) {
              models.GuideSpecialty.forge({guide_id: result8.id, specialty_id: result.id})
              .save()
              .then(result5 => {
                res.status(200).send();
                console.log('Successfully created guideSpecialty!');
              });
            } else {
              res.status(200).send();
              console.log('Guidespecialty already exists!');
            }
          });
        });
      });
    }
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch((error) => {
    console.log('There is an error creating guideSpecialty.', error);
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