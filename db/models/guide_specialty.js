const db = require('../');

const GuideSpecialty = db.Model.extend({
  tableName: 'guide_specialty',
  guide: function() {
    return this.belongsTo('Guide');
  },
  specialty: function() {
    return this.belongsTo('Specialty');
  }  
});

module.exports = db.model('GuideSpecialty', GuideSpecialty);
