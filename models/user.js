const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  // Required
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  firstname: String,
  lastname: String,
  type: String,
  birthday: Date,
  admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password on save
UserSchema.pre('save', onsave);

// Set comparePassword method on user model
UserSchema.methods.comparePassword = comparePassword;

const UserModel = mongoose.model('user', UserSchema);

function onsave(next) {
  // Only hash the password if it has been modified
  if (!this.isModified('password')) {
    return next();
  }

  // Generate salt
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // Hash the password along with the salt
    return bcrypt.hash(this.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      // Override the password with the hashed one
      this.password = hash;
      return next();
    });
  });
}

function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
}

module.exports = UserModel;
