var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {

    EventEmitter.call(this);

    var profileEmitter = this;

    //Connect to the API URL (https://teamtreehouse.com/username.json)
    var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

module.exports = Profile;
// function printError(error){
//     console.error(error.message);
// }
//
// function printWeather(query,temp){
//     // const message = (`Current temp in ${query} is ${(temp-(273.15))*(1.8)+(32)}`);
//     // const message = (`Current temp in ${query} is ${temp}`);
//     // console.log(message);
//     console.log(temp);
//     renderer.view("profile",temp,response);
//     //we want these values from the response of the json
//     renderer.view("footer",null,response);
//     response.end();
// }
//
// function profile(username){
//     //connect to our api with our api key and enter the specified city in query
//     const req = https.get(`https://teamtreehouse.com/${username}.json`, response => {
//         // read the data make an empty body string
//         let body = " ";
//         response.on('data', chunk => {
//             //upon a response that has data --> add the chunk to the body string
//             body += chunk;
//         });
//         response.on('end', () => {
//             if (response.statusCode === 200){
//                 //when we hit the json end tag
//                 try {
//                     const main = JSON.parse(body);
//                     //parse the json body and assign it to js
//                     printWeather(main.profile_name, main.profile_url)
//                     //call the method and print the weather
//                 } catch (error) {
//                     printError(error);
//                 }}
//             else{
//                 const statusErrorCode = new Error("Error. Please enter a city name or zip code");
//                 printError(statusErrorCode);
//             }
//         });
//
//     });
// }


util.inherits( Profile, EventEmitter );

module.exports = Profile;
// module.exports.profile = profile;

