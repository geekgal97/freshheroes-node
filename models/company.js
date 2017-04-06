const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: String,
  intro: String,
  description: String,
  type: String,
  amountOfEmployees: Number,
  status: String,
  website: String,
  social: {
    twitter: String,
    facebook: String,
    linkedin: String
  }
}, {
  timestamps: true
});

const CompanyModel = mongoose.model('company', CompanySchema);

module.exports = CompanyModel;