const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have name"],
  },
  email: {
    type: String,
    required: [true, "user must have email"],
    unique: true,
    validate: [validator.isEmail, "please provide a valid mail"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  conformPassword: {
    type: String,
    required: [true, "please provide conform password"],
    validate: {
      validator: function (el) {
        return this.password == el;
      },
      message: "passwords are not same",
    },
  },
});
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.conformPassword = undefined;
});
userschema.methods.correctpassword = async function (
  candidatepassword,
  password
) {
  return await bcrypt.compare(candidatepassword, password);
};
const User = mongoose.model("User", userschema);
module.exports = User;
