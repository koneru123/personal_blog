require("dotenv").config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const db = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

db
  .then(db => console.log(`Connected to Database`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: ${MONGO_URI}`);
    console.log(err);
  });

module.exports = db;