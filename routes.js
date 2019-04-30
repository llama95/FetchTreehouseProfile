var Profile = require("./profile");
var renderer = require("./renderer");

//the content type
var commonHeader = {'Content-Type': 'text/html'};

//home route
function homeRoute(request,response){
    if (request.url === '/'){
        response.writeHead(200, commonHeader);
        renderer.view("header",null,response);
        renderer.view("search",null,response);
        renderer.view("footer",null,response);
        response.end();
    }else{
        request.on("data",function (postBody) {
            console.log(postBody.toString());

        });
    }
}
function userRoute(request,response) {
    var username = request.url.replace("/", " ");
    if (username.length > 1) {
        response.writeHead(200,commonHeader);
        renderer.view("header",null,response);
        //get json from treehouse
        var studentProfile = new Profile(username);
        // we want these values from the response of the json
        studentProfile.on("end",function(profileJSON){
            //show profile
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profilename,
                badges: profileJSON.bagdes.length,
                javasriptPoints: profileJSON.points.JavaScript
            };
            renderer.view("profile",values,response);
            //we want these values from the response of the json
            renderer.view("footer",null,response);
            response.end();
        });
        studentProfile.on("error", function (error) {
            renderer.view("error",{errorMessage: error.message},response);
            renderer.view("footer",null,response);
            response.end();
        });
    }
}
module.exports.homeRoute = homeRoute;
module.exports.userRoute = userRoute;