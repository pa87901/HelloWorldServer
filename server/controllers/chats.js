const models = require('../../db/models');

module.exports.createChat = (req, res) => {
  console.log('req.body in createChat method', req.body);
  models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.User.where({id: req.body.guideFacebookId}).fetch({columns: ['id']})
    .then(result2 => {
      models.Guide.where({user_id: result2.id}).fetch({columns: ['id']})
      .then(result3 => {
        models.Chat.forge({user_id: result.id, guide_id: result3.id, message: req.body.message, author: req.body.author})
        .save()
        .then(result4 => {
          if (res) {
            res.status(200).send();
          }
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

module.exports.getChat = (req, res, callback) => {
  console.log('REQ PARAMS', req.params);
  models.User.where({facebook_id: req.params.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.User.where({id: req.params.guideFacebookId}).fetch({columns: ['id']})
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
            if (res) {
              res.status(200).send(chats);
            } else {
              callback(chats);
            }
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

module.exports.getAllChatsByUser = (req, res) => {
  console.log('REQ PARAMS1', req.params);
  models.User.where({facebook_id: req.params.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.Chat.query((qb) => {
      qb.limit(100); 
      qb.orderBy('created_at', 'desc');
    })
      .where({user_id: result.id}).fetchAll()
      .then(chats => {
        if (!chats) {
          throw chats;
        }
        res.status(200).send(chats);
        console.log('Successfully fetched all chats for user!!');
      });
  })
    .error(err => {
      res.status(500).send(err);
    })
    .catch((error) => {
      res.status(404).send([]);
      console.log(error);
    });
};

module.exports.getAllChatsByGuideId = (req, res) => {
  console.log('REQ PARAMS2', req.params);
  models.Chat.where({guide_id: req.params.guideId}).fetch()
  .then(chats => {
    console.log('Received chats by guideId', chats);
    res.status(200).send(chats);
  })
  // models.User.where({facebook_id: req.params.facebookId}).fetch({columns: ['id']})
  // .then(result => {
  //   models.Chat.query((qb) => {
  //     qb.limit(100); 
  //     qb.orderBy('created_at', 'desc');
  //   })
  //     .where({user_id: result.id}).fetchAll()
  //     .then(chats => {
  //       if (!chats) {
  //         throw chats;
  //       }
  //       res.status(200).send(chats);
  //       console.log('Successfully fetched all chats for user!!');
  //     });
  // })
    .error(err => {
      res.status(500).send(err);
    })
    .catch((error) => {
      res.status(404).send([]);
      console.log(error);
    });
};