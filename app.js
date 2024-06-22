const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const {
  createuser,
  getusers,
  deleteuser,
  // updateuser,
  getuser,
  signin,
  updateme,
  deleteme,
  login,
  // sendotp,
} = require("./controllers/usercontroller");
const {
  protect,
  restrictTo,
  forgetpasswordresettoken,
  resetpassword,
  updatepassword,
} = require("./controllers/authcontroller");
const {
  createTour,
  updateTour,
  getAllTours,
  getTour,
} = require("./controllers/tourcontroller");
const { sendotp } = require("./controllers/otpcontroller");
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT, () => {
  console.log("app listening to port 5000");
});
app.route("/api/v1/users").get(protect, getusers).post(createuser);
app.route("/api/v1/users/:id").get(getuser);
// .patch(updateuser)
// .delete(protect, restrictTo("admin"), deleteuser);
app.route("/api/v1/sendotp").post(sendotp);
app.route("/api/v1/login").post(signin);
app.route("/api/v1/signin").post(login);
app.route("/api/v1/forgetpassword").post(forgetpasswordresettoken);
app.route("/api/v1/resetpassword/:token").post(resetpassword);
app.route("/api/v1/updatepassword").patch(protect, updatepassword);
app.route("/api/v1/updateuser").patch(protect, updateme);
app.route("/api/v1/deleteuser").delete(protect, deleteme);
app.route("/api/v1/tours").post(createTour);
app.route("/api/v1/tours/:id").patch(updateTour);
app.route("/api/v1/tours").get(getAllTours);
app.route("/api/v1/tours/:id").get(getTour);
module.exports = app;
