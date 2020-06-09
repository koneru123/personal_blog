const path = require('path');
const express = require('express');
// Passport is Express-compatible authentication middleware for Node.js.
// authenticate requests
const passport = require("passport");
let app = express();
const db = require('../database/index.js');

// middleware
const parser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
// The Access-Control-Allow-Origin response header indicates whether 
// the response can be shared with requesting code from the given origin.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use("/api/users/", require("./routes/users"));

app.use("/api/posts/", require("./routes/posts"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

const port = 3005;

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));

module.exports = app;

