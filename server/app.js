'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(middleware.auth.session);
// app.use(middleware.passport.initialize());
// app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/users', routes.users);
app.use('/api/guides', routes.guides);
app.use('/api/ratings', routes.ratings);
app.use('/api/chats', routes.chats);
app.use('/api/specialties', routes.specialties);
app.use('/api/guidespecialties', routes.guideSpecialties);
app.use('/api/availabilities', routes.availabilities);
app.use('/api/bookings', routes.bookings);
// app.post('api/users', (req, res) => {
//   console.log('req.body in api/users post route', req.body);
//   let user = {};
//   res.sendStatus(200);
// });

module.exports = app;
