var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var dbconfig  = require('./Utils/dbConfig');
var appController = require('./Controller/appController');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
mongoose.connect(dbconfig.getConnectionStringUrl(),{useNewUrlParser: true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to MongoDB');
});
appController(app);

var Port = process.env.Port || 6300;

app.listen(Port);
