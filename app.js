const express = require("express");
const path = require("path");
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 8000;
const bodyparser = require("body-parser")


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'ejs') // Set template engine as pug
app.set('views' , path.join(__dirname, 'views')) // Set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    res.status(200).render('landing')
})

app.get('/game', (req,res) =>{
    res.status(200).render('game')
})

app.get('/memory', (req,res) =>{
    res.status(200).render('memoryModified')
})

app.get('/scramble', (req,res) =>{
    res.status(200).render('scramble')
})

app.get('/maths', (req,res) =>{
    res.status(200).render('maths')
})

app.get('/ticAI', (req,res) =>{
    res.status(200).render('ticAImodified')
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`Server is running at http://${hostname}:${port}/`)
})