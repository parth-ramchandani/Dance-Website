const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost:27017/ContactDance', {useNewUrlParser: true});
const port = 6969;

//Define Mongoose Schema
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', ContactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("The item was not sent to the Database")
    })

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
