const models = require('../../db/models');

module.exports.createAvailability = (req, res) => {
  models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.Guide.where({user_id: result.id}).fetch({columns: ['id']})
    .then(result2 => {
      models.Availability.forge({guide_id: result2.id, start_hr: req.body.startHr, end_hr: req.body.endHr, date: new Date(req.body.date)})
      .save()
      .then(result => {
        console.log('success creating availability!!');
        res.status(200).send();
      });
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    console.log('error creating availability.');
    res.sendStatus(404);
  });   
};
