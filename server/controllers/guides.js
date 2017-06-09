const models = require('../../db/models');

module.exports.createGuide = (req, res) => {
  models.User.where({facebook_id: req.body.facebookId}).fetch({columns: ['id']})
  .then(result => {
    if (!result) {
      models.Guide.forge({user_id: result.id})
      .save()
      .then(result => {
        console.log('success creating guide!!');
        res.status(200).send();
      });
    } else {
      console.log('guide already exists!');
      res.status(200).send();
    }  
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch((err) => {
    console.log('Error creating a guide.', err);
    res.sendStatus(404);
  });
};

module.exports.getOneGuide = (req, res) => {
  models.Guide.where({id: req.params.id})
  .fetch({
    withRelated: [
      {
        'user': function(qb) {
          qb.select();
        }
      },
      {
        'guideSpecialties.specialty': function(qb) {
          qb.select();
        }
      }
    ]
  })
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

module.exports.getGuideByChat = (req, res) => {
  //console.log('req.params in getGuideByChat method', req.params);
  models.Guide.where({id: req.params.id})
  .fetch()
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

module.exports.getGuideByUserId = (req, res) => {
  //console.log('req.params in getGuideByUserId method', req.params);
  models.User.where({facebook_id: req.params.facebookId})
  .fetch()
  .then(profile => {
    console.log(profile.attributes.id);
    models.Guide.where({user_id: profile.attributes.id}).fetch({columns: ['id']})
    .then(guideInfo => {
      console.log(guideInfo);
      res.status(200).send(guideInfo);
    });
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch(() => {
    res.sendStatus(404);
  });
};

module.exports.getSearchResults = (req, res) => {
  models.Guide.query((qb) => {
    qb.limit(25);
  })
  .fetchAll({
    withRelated: [
      {
        'user': function(qb) {
          qb.select();
        }
      },
      {
        'availabilities': function(qb) {
          qb.where('city', req.params.city);
        }
      },
      {
        'guideSpecialties.specialty': function(qb) {
          qb.select();
        }
      },
      {
        'bookings.user': function(qb) {
          qb.select();
        }
      }
    ],
  })
  .then(profiles => {
    profiles = JSON.parse(JSON.stringify(profiles));
    if (!profiles) {
      throw profiles;
    }
    profiles.forEach((profile) => {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;

      profile.bookings = profile.bookings.filter(booking=>!!booking.guide_review).map((booking)=>{
        return {
          userId: booking.user.user_id,
          userFullName: booking.user.full_name,
          userAvatar: booking.user.avatar,
          userJoinDate: booking.user.created_at,
          rating: booking.guide_rating, 
          review: booking.guide_review
        };
      });
      
      profile.availabilities = profile.availabilities.filter(post => {
        return new Date(`${req.params.date}, ${req.params.toHour}:00`) <= new Date(post.end_date_hr) && new Date(`${req.params.date}, ${req.params.fromHour}:00`) >= new Date(post.start_date_hr);
      });
    });

    // Iterate through critera send down for only keys with true value:
    // let trueCriteria = [];
    // for (let key in req.headers) {
    //   if (req.headers[key] === 'true') {
    //     trueCriteria.push(key);
    //   }
    // }
    // console.log('trueCriteria', trueCriteria);

    // let selectedGuides = [];
    // // Find guides that have this specialty.
    // trueCriteria.forEach(specialty => {
    //   models.Specialty.where({'specialty': specialty}).fetchAll({
    //     withRelated: [
    //       {
    //         'guideSpecialties.guide.user': (qb) => {
    //           qb.select();
    //         }
    //       },
    //     ]
    //   })
    //   .then(guideSpecialties => {
    //     console.log('guideSpecialty with guide info', guideSpecialties);
    //     // selectGuides.push(guideSpecialties);
    //     // res.status(200).send(guideSpecialties);
    //   })
      
    // })

    // Iterate through each profile's specialties array.
    
      // If their specialties include that in trueCriteria [], push to selected guides





    res.status(200).send(profiles);
  })
  .error(err => {
    res.status(500).send(err);
  })
  .catch((error) => {
    res.sendStatus(404);
    console.log('error getting search results.', error);
  });
};

module.exports.updateRating = (guideId, rating, count) => {
  models.Guide.where({id: guideId}).fetch()
  .then(fetchedModel => {
    fetchedModel.save({
      avg_rating: rating,
      rating_count: count
    })
    .then(result => {
      console.log('Successfully updated guide average rating!');
    });
  })
  .catch((err) => {
    console.log('error updating booking.', err);
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
