const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((e) => {
    console.log("Connection To Database Failed");
    console.log(e);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}`);
});
