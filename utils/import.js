const mongoose = require("mongoose");
const Tour = require("../models/tourmodel");
const fs = require("fs");
mongoose
  .connect(
    "mongodb+srv://bhushan:bhushan@cluster0.clpcael.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successs");
  })
  .catch((e) => {
    console.log(e);
  });
const file = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

if (process.argv[2] == "create") {
  const tours = Tour.create(file).then((tours) => {
    console.log(tours);
    process.exit();
  });
}
if (process.argv[2] == "delete") {
  const tours = Tour.deleteMany().then((tours) => {
    console.log(tours);
    process.exit();
  });
}
