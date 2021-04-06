//modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require('ejs');

const app = express();

//routes
const routes = require("./routes/routes");

//middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

//DB connection
mongoose.connect("mongodb://localhost:27017/wikiDB",{ useNewUrlParser: true ,useUnifiedTopology: true},(err => {
    if(err) console.log(err);
    else console.log("DB connection successful...");
}));

//PORT
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`server started on port ${port}...`);
})