// const { default: isEmail } = require("validator/lib/isEmail");
const dotenv = require("dotenv");

const user = require("../models/usermodel");
const jswebtoken = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
function tokencreation(id) {
  const token = jswebtoken.sign({ id: id }, process.env.SECRET, {
    expiresIn: "90d",
  });
  return token;
}
function createuser(req, res) {
  const { name, email, password, conformPassword, changepasswordat, role } =
    req.body;
  const date = new Date(changepasswordat);
  console.log(date);
  const newuser = new user({
    name,
    role,
    email,
    password,
    conformPassword,
    changepasswordat,
  });
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

    // console.log(docs);
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
async function deleteuser(req, res) {
  console.log(req.params);
  try {
    let deluser = await user.deleteOne({ _id: req.params.id });
    res.json({
      deluser,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
}
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
