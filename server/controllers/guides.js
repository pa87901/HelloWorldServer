const models = require('../../db/models');

module.exports.createGuide = (req, res) => {
  models.User.where({username: req.body.username}).fetch({columns: ['id']})
   .then(result => {
	  // models.Guide.forge({ username: req.body.username, first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email, phone: req.body.phone })
	  //   .save()
	  //   .then(result => {
	  //     console.log('success creating guide!!');
	  //   })
	  //   .catch(err => {
	  //     console.log('error creating user');
	  //   });
	  console.log(result.id);
	  res.status(200).send();
   	})
   .catch(err => {
      res.status(500).send(err);
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