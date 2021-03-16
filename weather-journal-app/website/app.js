/* Global Variables */
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = `&units=metric&appid=89a77ea5f2169f4a67c5164133d2ea8d`;
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=89a77ea5f2169f4a67c5164133d2ea8d
let newZipValue = document.getElementById('zip').value;
let newFeelingsValue = document.getElementById('feelings').value;
const gen = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear()+'dd/mm/yyyy';

// Main function to get weather informations live.
const getWeatherInfo = async () => { // baseURL, zipValue, regKey
    const newZipValue = document.getElementById('zip');
    const requestOne = await fetch (baseURL+newZipValue.value+apiKey);
    // console.log(requestOne);
    try {
        const respondOne = await requestOne.json();
        // console.log(respondOne);
        return respondOne;
    }catch (error) {
        console.log('error', error);
    }
};

// Listen for a valid click to the generate botton
gen.addEventListener('click', genBotClicked);
// The callback function
function genBotClicked (event) {
    event.preventDefault()
    // Perform API call
    getWeatherInfo(baseURL, newZipValue, apiKey)
    // After successful request completed
        .then( function(newData) {
        // console.log(newData);
        // Perform POST request
        postNewData('/all', {
            date: newDate,
            tempF: Math.round(newData.main.temp),
            // tempC: ((tempF - 32) * 5 / 9),
            content: newFeelingsValue
            });
        updateUserInterface();
    })
};


const postNewData = async (url ='', newData = {} ) => {
    // console.log(newData);
    const requestSecond = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newData)
    });
    try {
        const finalData = await requestSecond.json();
        // console.log(finalData);
        return finalData;
    }catch (error) {console.log('error', error);}
};



const updateUserInterface = async () => {
    const finalRequest = await fetch ('/a');
    try {
        const output = await request.json();
        // console.log(output);
        document.getElementById(date).innerHTML = `Date: ${output[0].date}`;
        document.getElementById(temp).innerHTML = `Temperature: ${output[0].tempF}°F.`;
        document.getElementById(temp).innerHTML = `Temperature: ${output[0].tempC}°C.`;
        document.getElementById(content).innerHTML = `People feel today: ${output[0].content}`;
    }catch (error) {console.log('error', error);}
};