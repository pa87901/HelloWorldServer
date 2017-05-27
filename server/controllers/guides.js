const models = require('../../db/models');

module.exports.createGuide = (req, res) => {
  models.User.where({username: req.body.username}).fetch({columns: ['id']})
   .then(result => {
     models.Guide.forge({ user_id: result.id, city: req.body.city, hourly_rate: req.body.hourlyRate, intro: req.body.intro, statement: req.body.statement})
      .save()
      .then(result => {
        console.log('success creating guide!!');
        res.status(200).send();
      });
   })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });   
};

module.exports.getOneGuide = (req, res) => {
  console.log(req.params)
  models.Guide.where({id: req.params.id}).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
