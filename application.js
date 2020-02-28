const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const init = require('./routes/routes').init;
app.use(cors(), function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(morgan('dev'))
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))
// calling routes
init(app);
app.use(express.static(path.join(__dirname, `${process.env.NODE_ENV === 'development'? 'public' : 'build'}`)));
app.get('/abc', (req, res) => {
    res.send('ok');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `${process.env.NODE_ENV === 'development'? 'public' : 'build'}/index.html`));
});

module.exports = app
