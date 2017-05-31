const db = require('../');

const GuideSpecialty = db.Model.extend({
  tableName: 'guide_specialty',
  guide: function() {
    return this.belongsTo('Guide', 'guide_id');
  },
  specialty: function() {
    return this.belongsTo('Specialty', 'specialty_id');
  }  
});

module.exports = db.model('GuideSpecialty', GuideSpecialty);
