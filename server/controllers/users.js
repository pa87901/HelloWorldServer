const models = require('../../db/models');


module.exports.getAll = (req, res) => {
  models.User.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  console.log('create req.body', req.body);
  models.User.forge({ username: req.body.username, first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email, phone: req.body.phone })
    .save()
    .then(result => {
      console.log('success creating user!!');
      // res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      // if (err.constraint === 'users_username_unique') {
      //   return res.status(403);
      // }
      console.log('error creating user');
      // res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
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

module.exports.update = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.User.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
