const models = require('../../db/models');

module.exports.createRating = (req, res) => {
  models.User.where({username: req.body.username}).fetch({columns: ['id']})
  .then(result => {
    models.User.where({username: req.body.guideUsername}).fetch({columns: ['id']})
    .then(result2 => {
      models.Guide.where({user_id: result2.id}).fetch({columns: ['id', 'statement']})
      .then(result3 => {
        models.Rating.forge({user_id: result.id, guide_id: result3.id, rating: req.body.rating, rated_by: req.body.ratedBy})
        .save()
        .then(result4 => {
          res.status(200).send();
          console.log('Successfully created rating!!');
        });
      });
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
    .catch(() => {
      res.sendStatus(404);
    });
};