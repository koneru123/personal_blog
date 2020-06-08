const express = require('express');
const passport = require("passport");
let app = express();
const db = require('../database/index.js');

// middleware
const parser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use("/api/users/", require("./routes/users"));

app.use("/api/posts/", require("./routes/posts"));

const port = 3005;

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));

module.exports = app;

