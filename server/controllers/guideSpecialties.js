const models = require('../../db/models');

module.exports.createGuideSpecialty = (req, res) => {
  models.Specialty.where({specialty: req.body.specialty}).fetch({columns: ['id']})
    .then(result => {
      if (!result.id) {
        models.Specialty.forge({specialty: req.body.specialty})
          .save()
          .then(successResult => {
            console.log('Successfully created specialty!!');

            models.User.where({facebook_id: req.body.guideFacebookId}).fetch({columns: ['id']})
            .then(result2 => {
              models.Guide.where({user_id: result2.id}).fetch({columns: ['id']})
              .then(result3 => {
                models.Specialty.where({specialty: req.body.specialty}).fetch({columns: ['id']})
                .then(result4 => {
                  models.GuideSpecialty.forge({guide_id: result3.id, specialty_id: result4.id})
                  .save()
                  .then(result5 => {
                    res.status(200).send();
                    console.log('Successfully created guideSpecialty!!');
                  });                      
                });
              });
            });
          });
      } else {
        models.User.where({facebook_id: req.body.guideFacebookId}).fetch({columns: ['id']})
        .then(result2 => {
          models.Guide.where({user_id: result2.id}).fetch({columns: ['id']})
          .then(result3 => {
            
            models.GuideSpecialty.where({guide_id: result3.id, specialty_id: result.id}).count()
            .then(result4 => {
              if (result4 === '0') {
                models.GuideSpecialty.forge({guide_id: result3.id, specialty_id: result.id})
                .save()
                .then(result4 => {
                  res.status(200).send();
                  console.log('Successfully created guideSpecialty!!');
                });
              } else {
                res.status(200).send();
                console.log('The guideSpecialty already exists in DB!');
              }
            });
          });
        });
      }
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      console.log('There is an error creating guideSpecialty.');
      res.sendStatus(404);
    });
};