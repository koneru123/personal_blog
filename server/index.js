const express = require('express');
let app = express();

// middleware
const parser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const port = 3005;

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));

module.exports = app;

