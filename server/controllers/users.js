const models = require('../../db/models');


// module.exports.getAll = (req, res) => {
//   models.User.fetchAll()
//     .then(profiles => {
//       res.status(200).send(profiles);
//     })
//     .catch(err => {
//       // This code indicates an outside service (the database) did not respond in time
//       res.status(503).send(err);
//     });
// };

module.exports.createUser = (req, res) => {
  models.User.forge({
    facebook_id: req.body.userId, 
    full_name: req.body.name, 
    email: req.body.email, 
    avatar: req.body.picture, 
    picture: req.body.extraInfo.picture_large
  })
    .save()
    .then(result => {
      if (result) {
        res.status(201).send('success creating user!!');
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
};

module.exports.getUser = (req, res) => {
  models.User.where({ facebook_id: req.params.facebookId}).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .catch((err) => {
      if (err) {
        res.send(500).send(err);
      }
    });
};

module.exports.getUserById = (req, res) => {
  req.params.id = Number(req.params.id);
  models.User.where({ id: req.params.id}).fetch()
    .then(profile => {
      // console.log('profiles', profile);
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    // .error(err => {
    //   res.status(500).send(err);
    // })
    .catch((err) => {
      res.status(500).send(err);
//      res.sendStatus(404);
    });
};

module.exports.getUserById = (req, res) => {
  req.params.id = Number(req.params.id);
  models.User.where({ id: req.params.id}).fetch()
    .then(profile => {
      // console.log('profiles', profile);
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    // .error(err => {
    //   res.status(500).send(err);
    // })
    .catch((err) => {
      res.status(500).send(err);
//      res.sendStatus(404);
    });
};

module.exports.updateRating = (userId, rating, count) => {
  models.User.where({id: userId}).fetch()
  .then(fetchedModel => {
    fetchedModel.save({
      avg_rating: rating,
      rating_count: count
    })
    .then(result => {
      console.log('Successfully updated user average rating!');
    });
  })
  .catch((err) => {
    console.log('error updating booking.', err);
  });   
};
