var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/upload', upload.none(), function (req, res, next) {

})
