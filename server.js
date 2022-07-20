const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(require("./routes"));
mongoose.connect("mongodb://localhost:27017/ThinkItOutSocial", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`Connected to local Host ${PORT}`);
});
