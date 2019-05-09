//Main start point of our application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const router = require('./router');

//MongoDB setup
mongoose.connect('mongodb://test:test123@ds013946.mlab.com:13946/db_vidium')

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);

//Server setup
const port = process.env.port || 4090;
const server = http.createServer(app);
server.listen(port);
console.log('Listening to port: ', port);