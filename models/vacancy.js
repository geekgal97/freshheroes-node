const mongoose = require('mongoose');

const VacancySchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  category: String,
  address: {
    street: String,
    zipcode: String,
    city: String
  },
  deadline: Date,
  name: String
}, {
  timestamps: true
});

const VacancyModel = mongoose.model('vacancy', VacancySchema);

module.exports = VacancyModel;
