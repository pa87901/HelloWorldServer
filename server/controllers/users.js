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
  console.log('create req.body', req.body);
  models.User.forge({ username: req.body.username, first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email, phone: req.body.phone })
    .save()
    .then(result => {
      res.status(200).send();
      console.log('success creating user!!');
    })
    .error(err => {
      res.status(500).send(err);
      console.log('error creating user!!');
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getUser = (req, res) => {
  models.User.where({ username: req.params.username}).fetch()
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

// module.exports.update = (req, res) => {
//   models.User.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.save(req.body, { method: 'update' });
//     })
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .error(err => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

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
