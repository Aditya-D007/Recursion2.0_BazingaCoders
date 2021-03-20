const mongoose = require('mongoose');
const express = require('express');


const hospitalRoute = require('./src/route/hospitalRoute');
const patientRoute = require('./src/route/patientRoute');

const MONGO_DB_URI = "mongodb+srv://reuben:reuben@mongodb.syifj.mongodb.net/vaccine_locator?retryWrites=true&w=majority"



const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const port = process.env.PORT

app.use(express.json())
app.use(hospitalRoute);
app.use(patientRoute);


mongoose.connect(MONGO_DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
})
    .then(res => {
        app.listen(4000);
        // app.listen(process.env.PORT || 5000)
    }).catch(err => {
    console.log(err);
    });



