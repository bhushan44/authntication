const jwt = require("jsonwebtoken");
const user = require("../models/usermodel");
async function protect(req, res, next) {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }
  if (!token) {
    return res.json({
      status: "failure",
      message: "user not logged in ,please login to ACCESS TO DATA",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, "BHUSHAN");

    // next();
  } catch (e) {
    return res.json({
      message: "invalidd token",
    });
  }

  const freshuser = await user.findOne({ _id: decoded.id });
  if (!freshuser) {
    return res.json({
      message: "user no longer exists with that token",
    });
  }
  console.log(freshuser.iat, "iat");
  if (freshuser.changedpasswordafter(decoded.iat)) {
    return res.json({
      message: " user recently changed password login again",
    });
  }
  req.user = freshuser;
  next();
}
function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.json("you dont have permission to perform thsi action");
    }

    next();
  };
}
async function forgetpasswordresettoken(req, res) {
  let email = req.body.email;
  let user1 = await user.findOne({ email });
  if (!user1) {
    res.json({
      status: "no users exists with given mail",
    });
  }
  const resettoken = user1.createpasswordresettoken();
  user1.save({ validateBeforeSave: false });
}
module.exports = { protect, restrictTo, forgetpasswordresettoken };
