const mongoose = require('mongoose');

const VacancySchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  companyName: String,
  companyType: String,
  companyEmployees: Number,
  category: String,
  address: {
    street: String,
    zipcode: String,
    city: String
  },
  deadline: Date,
  name: String,
  description: String
}, {
  timestamps: true
});

const VacancyModel = mongoose.model('vacancy', VacancySchema);

module.exports = VacancyModel;
