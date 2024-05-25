// const { default: isEmail } = require("validator/lib/isEmail");
const dotenv = require("dotenv");

const user = require("../models/usermodel");
const jswebtoken = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
function tokencreation(id) {
  const token = jswebtoken.sign({ id: id }, process.env.SECRET);
  return token;
}
function createuser(req, res) {
  const newuser = new user(req.body);
  newuser
    .save()
    .then((doc) => {
      // const token = jswebtoken.sign({ id: doc._id }, process.env.SECRET);
      const token = tokencreation(doc._id);
      res.json({
        status: "success",
        token,
        data: doc,
      });
    })
    .catch((e) => {
      res.send(e);
    });
}
async function getusers(req, res) {
  try {
    // const user1 = new user();
    const docs = await user.find();

    console.log(docs);
    res.json({
      status: "success",
      // token,
      result: {
        docs,
      },
    });
  } catch (e) {
    res.send({
      status: "failure",
      error: e,
    });
  }
}

function getuser() {}
function updateuser() {}
function deleteuser() {}
async function signin(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({
        status: "failure",
        message: "please provide mail and password",
      });
    }
    console.log("E", email);
    const result = await user.findOne({ email });
    console.log(result.password);

    if (!res || !(await result.correctpassword(password, result.password))) {
      res.json({
        status: "failure",
        message: "invalid user or password",
      });
    }
    const token = tokencreation(result._id);
    res.json({
      status: "s",
      token,
    });
  } catch (e) {
    res.json({
      status: "error",
      error: e.message,
    });
  }
}
module.exports = {
  createuser,
  getusers,
  getuser,
  updateuser,
  deleteuser,
  signin,
};
