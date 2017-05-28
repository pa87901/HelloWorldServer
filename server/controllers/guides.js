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

module.exports.getSearchResults = (req, res) => {
  console.log(req.params);
  models.Guide.query((qb) => { qb.limit(25); }).fetchAll()
    .then(profiles => {
      if (!profiles) {
        throw profiles;
      }
      res.status(200).send(profiles);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// user.where({
//     id: 43
//   }).fetchAll({
//     withRelated: ['feed.userRelated', 'feed.activityTypes']
//   }).then(function(data) {
//     data = data.toJSON();
//     res.send(data);
//   });
