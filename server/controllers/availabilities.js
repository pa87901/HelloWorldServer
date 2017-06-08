const models = require('../../db/models');

module.exports.createAvailability = (req, res) => {
  models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
  .then(result => {
    models.Guide.where({user_id: result.id}).count()
    .then(result2 => {
      if (result2 === '0') {
        models.Guide.forge({user_id: result.id})
        .save()
        .then(result3 => {
          console.log('Successfully created a guide!');
          models.Guide.where({user_id: result.id}).fetch({columns: ['id']})
          .then(result4 => {
            models.Availability.forge({guide_id: result4.id, city: req.body.city, hourly_rate: req.body.hourlyRate, intro: req.body.intro, statement: req.body.statement, start_hr: req.body.startHr, end_hr: req.body.endHr, date: req.body.date})
            .save()
            .then(result5 => {
              console.log('Successfully created availability!');
              res.status(200).send();
            });
          });
        });
      } else {
        models.Guide.where({user_id: result.id}).fetch({columns: ['id']})
        .then(result6 => {
          models.Availability.forge({guide_id: result6.id, city: req.body.city, hourly_rate: req.body.hourlyRate, intro: req.body.intro, statement: req.body.statement, start_hr: req.body.startHr, end_hr: req.body.endHr, date: req.body.date})
          .save()
          .then(result5 => {
            console.log('Successfully created availability!');
            res.status(200).send();
          });
        });
      }
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    console.log('error creating availability.');
    res.sendStatus(404);
  });
};   




module.exports.getAvailability = (req, res) => {
  models.Availability.where({id: req.params.id}).fetch()
  .then(result => {
    result = JSON.parse(JSON.stringify(result));
    models.Guide.where({id: result.guide_id}).fetch()
    .then(result2 => {
      result2 = JSON.parse(JSON.stringify(result2));
      models.Booking.where({guide_id: result.guide_id}).fetchAll(

      )
      .then(result3 =>{
        result3 = JSON.parse(JSON.stringify(result3));
        result3 = result3.filter(booking=>!!booking.guide_review).map(booking => {
          return {
            userId: booking.user_id,
            rating: booking.guide_rating, 
            review: booking.guide_review
          };
        });
      });
      //res.status(201).send({post: result, guide:result2});
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    console.log('error creating availability.');
    res.sendStatus(404);
  });
};   







// {
//   models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
//   .then(result => {
//     models.Guide.where({user_id: result.id}).fetch({columns: ['id']})
//     .then(result2 => {
//       models.Availability.forge({guide_id: result2.id, start_hr: req.body.startHr, end_hr: req.body.endHr, date: new Date(req.body.date)})
//       .save()
//       .then(result => {
//         console.log('success creating availability!!');
//         res.status(200).send();
//       });
//     });
//   })
//   .error(err => {
//     res.status(500).send(err);
//   })
//   .catch(() => {
//     console.log('error creating availability.');
//     res.sendStatus(404);
//   });   
// };