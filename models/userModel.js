const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// User.beforeCreate(function(user){
//   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10),null);
// });

UserSchema.pre('save', function(next)  {
  let user = this;
  console.log('user', user)
  bcrypt.hash(user.password, 10, function(error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      user.confirmPassword = hash;
      next();
    }
  });
});

UserSchema.pre('validate', function(next) {
  let user = this;
  console.log('user', user)
  if (user.password !== user.confirmPassword) {
    return next('Passwords must match');
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
