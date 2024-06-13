const express = require("express");
const app = express();
const dotenv = require("dotenv");
const {
  createuser,
  getusers,
  deleteuser,
  updateuser,
  getuser,
  signin,
} = require("./controllers/usercontroller");
const {
  protect,
  restrictTo,
  forgetpasswordresettoken,
} = require("./controllers/authcontroller");
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log("app listening to port 5000");
});
app.route("/api/v1/users").get(protect, getusers).post(createuser);
app
  .route("/api/v1/users/:id")
  .get(getuser)
  .patch(updateuser)
  .delete(protect, restrictTo("admin"), deleteuser);
app.route("/api/v1/login").post(signin);
app.route("/api/v1/forgetpassword").post(forgetpasswordresettoken);
module.exports = app;
