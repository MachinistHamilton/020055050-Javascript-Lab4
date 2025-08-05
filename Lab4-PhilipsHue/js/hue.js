// STEP 7a: Add the URL for the bridge (use IP from step 2)

const bridge = "http://192.168.1.41"; 



// STEP 7b: Add a constant for your specific username (from Step 3d response)

const user = "3bXy123abc456myHueApp"; // Example – replace with your real username



// STEP 7c: Add another constant for your light number (from Step 4b)

const lightNum = "1";



// STEP 7d: Set method to 'PUT' to send control commands

let method = "PUT";



// STEP 7e: Build the full RESTful API endpoint for state control

const endpoint = `${bridge}/api/${user}/lights/${lightNum}/state`;



const html = document.querySelector('html');

const hueSlider = document.getElementById("hue");



// STEP 9a–9b: Add event listener to slider; send updated color to bulb when slider changes

hueSlider.addEventListener("change", function() {

var newHue = this.value * 1000;

updateScreenColor(newHue);

var commands = '{ "hue" : ' + newHue + ', "sat" : 254, "bri" : 254, "on" : true }';



// STEP 9b: Call the updateLight() function with new command

updateLight(commands);

}, false);



// Function that updates background color of the screen based on hue value

function updateScreenColor(newHue){

let cssHue = Math.round(newHue / 48000 * 240); // Maps 0–65535 to CSS hue range (0–240)

let bgCSSValue = `hsl(${cssHue}deg, 100%, 50%)`;

console.log(bgCSSValue); // Debug: Logs color code

html.style.backgroundColor = bgCSSValue;

}



// STEP 8: Function to update the Hue light with API call

function updateLight(bodyData){

fetch(endpoint, {

method: method,

body: bodyData

})

.then(response => response.json())   // STEP 8b: Parse the response to JSON

.then(data => console.log("Bridge Response:", data)) // Log response for confirmation

.catch(error => console.error("Error:", error));   // Log any network/API errors

}
	// STEP 8a: Use the fetch() method

	fetch(endpoint, {
		method: method,
		body: bodyData
	})

	// STEP 8b: Chain .then after the fetch(), and collect the response from the server (bridge)


// STEP 10: Look up the Philips Hue API to learn about other ways to work with the Hue lighting products - I hope you had fun!


// Lab 4 - Philips Hue JavaScript Control

//step 1
// Toggle light on/off Button
//lightIsOn variable is used to track the state of the light
// updateLight() is the API call function used to send commands to the Hue bridge
const toggleButton = document.getElementById("toggle");
let lightIsOn = true;

toggleButton.addEventListener("click", function() {
    lightIsOn = !lightIsOn;
    const toggleCommand = `{ "on" : ${lightIsOn} }`;
    updateLight(toggleCommand);
    toggleButton.textContent = lightIsOn ? "Turn Off" : "Turn On";
}, false);

//step 2
// Slider for brightness control
// event listener for the brightness slider change
// brightness value is sent to the Hue bridge as part of the command
// updateLight() is called with the brightness command
const brightnessSlider = document.getElementById("brightness");
brightnessSlider.addEventListener("change", function() {
    const brightness = this.value;
    const brightnessCommand = `{ "bri" : ${brightness}, "on" : true }`;
    updateLight(brightnessCommand);
});


//step 3
// slider for saturation control
// event listener for the saturation slider change
// saturation value is sent to the Hue bridge as part of the command
// updateLight() is called with the saturation command
const saturationSlider = document.getElementById("saturation");
saturationSlider.addEventListener("change", function() {
    const saturation = this.value;
    const saturationCommand = `{ "sat" : ${saturation}, "on" : true }`;
    updateLight(saturationCommand);
});