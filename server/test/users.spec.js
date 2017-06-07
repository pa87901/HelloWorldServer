'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('users API', function () {
  // beforeEach(function (done) {
  //   dbUtils.rollbackMigrate(done);
  // });

  // // Resets database back to original settings
  // afterEach(function (done) {
  //   dbUtils.rollback(done);
  // });
  var profileFacebookId = "facebook|" + Math.floor(Math.random() * 10000000000);
  var userEmail = Math.floor(Math.random() * 100000000) + '@gmail.com';
  var userFullName = Math.floor(Math.random() * 100000000);
  var profile = {
    userId: profileFacebookId, 
    name: userFullName, 
    email: userEmail,
    avatar: 'http://www.cryptomundo.com/wp-content/uploads/jokerbatcard.jpg', 
    extraInfo: {
      picture_large: 'http://www.cryptomundo.com/wp-content/uploads/jokerbatcard.jpg'
    }
  };
  
  it('accepts POST requests to /api/users', function (done) {
    request(app)
      .post('/api/users')
      //.setHeaders('Content-Type', 'application/json')
      .send(profile)
      .expect(201)
      .expect((res) => {
        expect(res.text).to.equal('success creating user!!');
      }) 
      .end(done);
  });

  it('accepts rejects duplicate profile requests to /api/users', function (done) {
    request(app)
      .post('/api/users')
      .send(profile)
      .expect(500)
      .end(done);
  });

  it('accepts GET requests to /api/users', function (done) {
    request(app)
      .get('/api/users/' + profile.userId)
      .expect(200)
      .expect((res) => {
        expect(typeof JSON.parse(JSON.stringify(res.body))).to.equal('object');
      }) 
      .end(done);
  });

  it('rejects GET requests to /api/users for non-existant user', function (done) {
    request(app)
      .get('/api/users/' + 'notauser')
      .expect(500)
      .end(done);
  });

  it('accepts GET requests to /api/users/byUserId', function (done) {
    request(app)
      .get('/api/users/byUserId/' + '1')
      .expect(200)
      .expect((res) => {
        //console.log(JSON.parse(JSON.stringify(res.body)));
        expect(typeof JSON.parse(JSON.stringify(res.body))).to.equal('object');
      }) 
      .end(done);
  });




//   it('accepts GET requests to /api/profiles/:id', function (done) {
//     request(app)
//       .get('/api/profiles/1')
//       .expect(res => {
//         res.body = {
//           id: res.body.id,
//           created_at: !!Date.parse(res.body.created_at)
//         };
//       })
//       .expect(200, {
//         id: 1,
//         created_at: true
//       })
//       .end(done);
//   });

//   it('sends 404 if id on GET requests to /api/profiles/:id does not exist', function (done) {
//     request(app)
//       .get('/api/profiles/123')
//       .expect(404)
//       .end(done);
//   });


//   it('accepts PUT requests to /api/profiles/:id', function () {
//     let profile = {
//       first: 'James',
//       last: 'Davenport',
//       display: 'James Davenport',
//       email: 'example@email.com',
//       phone: '415-555-1234'
//     };

//     return request(app)
//       .put('/api/profiles/1')
//       .send(profile)
//       .expect(201)
//       .then(() => {
//         return request(app)
//           .get('/api/profiles/1')
//           .expect(res => {
//             res.body = {
//               first: res.body.first,
//               last: res.body.last,
//               display: res.body.display,
//               email: res.body.email,
//               phone: res.body.phone
//             };
//           })
//           .expect(200, profile);
//       });
//   });

//   it('sends 404 if id on PUT requests to /api/profiles/:id does not exist', function (done) {
//     request(app)
//       .put('/api/profiles/123')
//       .expect(404)
//       .end(done);
//   });

//   // it('accepts DELETE requests to /api/profiles/:id', function (done) {
//   //   request(app)
//   //     .delete('/api/profiles/1')
//   //     .expect(200)
//   //     .end(done);
//   // });

//   // it('sends 404 if id on DELETE requests to /api/profiles/:id does not exist', function (done) {
//   //   request(app)
//   //     .delete('/api/profiles/123')
//   //     .expect(404)
//   //     .end(done);
//   // });

});
