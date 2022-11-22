const express = require('express');
const cors = require('cors');
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

app.post('/addWeather', (req, res) => {
    console.log("inside post addweather");
    const { newDate, temp, feeling } = req.body
    projectData.date = newDate
    projectData.temp = temp
    projectData.feeling = feeling
    res.end()
})

//View data to user
app.get('/getWeather', (req, res) => {
    console.log("get weather");
    res.send(projectData)
})