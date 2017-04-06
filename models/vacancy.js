const mongoose = require('mongoose');
const slug = require('slug');

const VacancySchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  slug: String,
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

VacancySchema.pre('save', onsave);

const VacancyModel = mongoose.model('vacancy', VacancySchema);

module.exports = VacancyModel;

function onsave(next) {
  this.slug = slug(this.name);
  next();
}
