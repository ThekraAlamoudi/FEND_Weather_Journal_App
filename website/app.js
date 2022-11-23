
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

/* Global Variables */
const apiKey = '23fef9fc8b429e4a1cd44d60e98563bf&units=metric';

// GET request from OpenWeather using entered zip code
// Create generate event listener for button 
const generate = document.getElementById('generate');
console.log("generate button");
generate.addEventListener('click', async () => {
    try {
        console.log("inside try");
        let zip = document.getElementById('zip').value;
        let feeling = document.getElementById('feelings').value;

        const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
        // response in json
        const response = await fetch(baseURL).then(res => res.json());
        const temp = await response.main.temp
        console.log(temp);

        // POST Request to save data in app
        console.log("fetch add wheather");
        await fetch('/addWeather', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                newDate, temp, feeling
            })

        })
        //-----
        console.log("fetch get weather");
        const resultData = await fetch('/getWeather').then(res => res.json())
        document.getElementById('date').innerHTML = resultData.date;
        document.getElementById('content').innerHTML = resultData.feeling;
        document.getElementById('temp').innerHTML = resultData.temp + '°';

    } catch (err) {
        console.error('ERROR!', err);
    }
})

