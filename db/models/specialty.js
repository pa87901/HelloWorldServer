const db = require('../');

const Specialty = db.Model.extend({
  tableName: 'specialties',
  guideSpecialties: function() {
    return this.hasMany('GuideSpecialty');
  }
});

module.exports = db.model('Specialty', Specialty);
