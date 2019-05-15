const express = require ("express");
const app = express ();
const helmet = require ("helmet");
const bodyParser = require('body-parser');
const config = require("./config/config.js");
const db = require('./models');
const router = express.Router();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

const r = (path) =>  require(path)(express, db);

router.use('/auth',  r('./routes/auth'));
router.use('/question',  r('./routes/question'));
router.use('/answer',  r('./routes/answer'));
router.use('/group', r('./routes/group'));

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use("/api/v1", router);
app.listen(config.port, function(){
	console.log(`Lintening on localhost:${config.port}`);
});