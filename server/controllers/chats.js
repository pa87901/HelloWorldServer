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
  console.log('REQ PARAMS', req.params);
  models.User.where({username: req.params.username}).fetch({columns: ['id']})
  .then(result => {
    models.User.where({username: req.params.guideUsername}).fetch({columns: ['id']})
    .then(result2 => {
      models.Guide.where({user_id: result2.id}).fetch({columns: ['id']})
      .then(result3 => {
        models.Chat.query((qb) => {
          qb.limit(100); 
          qb.orderBy('created_at', 'desc');
        })
          .where({user_id: result.id, guide_id: result3.id}).fetchAll()
          .then(chats => {
            if (!chats) {
              throw chats;
            }
            res.status(200).send(chats);
            console.log('Successfully fetched chats!!');
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