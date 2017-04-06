const mongoose = require('mongoose');
const slug = require('slug');

const CompanySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  slug: String,
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

CompanySchema.pre('save', onsave);

const CompanyModel = mongoose.model('company', CompanySchema);

module.exports = CompanyModel;

function onsave(next) {
  this.slug = slug(this.name);
  next();
}
