// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
/* Dependencies */
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server - Check activity with port indicator
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
});

// Create Primary GET route which gets all data 
// localhost:8080/all 
app.get('/all', (req, res) => {
    res.send(projectData)
});

// Create Secondary POST route to hold the values
// localhost:8080/add
app.post('/add', (req, res) => {
    // console.log(req.body);
    projectData = req.body;
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.userFeelings = req.body.feelings;
    
});