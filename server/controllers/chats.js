const models = require('../../db/models');

module.exports.createChat = (req, res) => {
  models.User.where({username: req.body.username}).fetch({columns: ['id']})
  .then(result => {
    models.User.where({username: req.body.guideUsername}).fetch({columns: ['id']})
    .then(result2 => {
      models.Guide.where({user_id: result2.id}).fetch({columns: ['id']})
      .then(result3 => {
        models.Chat.forge({user_id: result.id, guide_id: result3.id, message: req.body.message, author: req.body.author})
        .save()
        .then(result4 => {
          res.status(200).send();
          console.log('Successfully created chat!!');
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

module.exports.getChat = (req, res) => {
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