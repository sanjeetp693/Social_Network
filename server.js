const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const cors=require('cors')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var connection = require('./config/config.db');
const route = require('./routers/router');


app.use(cors());
app.get('/',(req, res, next) =>{
    res.send("Home page");
    next();
});

app.use('/',route);
app.listen(9000);
console.log("server start at 9000 port no.");

app.use(express.static('uploads'));   
app.use('/uploads', express.static('uploads'));