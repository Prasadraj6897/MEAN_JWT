require('./models/user.models.js'); //without this it showing error of schema hasn't been registere\
require('./config/passportConfig');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');


const rtsIndex = require('./routes/index.router');


var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());


app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    
});

mongoose.connect('mongodb+srv://Prasad_Database:Prasad_Databse123@cluster0.1qfop.mongodb.net/MEAN_JWT?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true})
    .then(()=>app.listen(5000, ()=>console.log(`Server running 5000`)))
    .catch((err)=>console.log(err))

mongoose.set('useFindAndModify', false)