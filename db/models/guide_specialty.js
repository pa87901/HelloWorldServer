const db = require('../');

const GuideSpecialty = db.Model.extend({
  tableName: 'guide_specialty',
  guide: () => {
    return this.belongsTo('Guide');
  },
  specialty: () => {
    return this.belongsTo('Specialty');
  }  
});

module.exports = db.model('GuideSpecialty', GuideSpecialty);
