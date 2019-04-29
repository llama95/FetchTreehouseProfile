var Profile = require("./profile");
var renderer = require("./renderer");

//home route
function homeRoute(request,response){
    if (request.url === '/'){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        renderer.view("header",null,response);
        response.write("Search\n");
        response.end("Footer");
    }
}
function userRoute(request,response) {
    var username = request.url.replace("/", " ");
    if (username.length > 1) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Header\n");
        //get json from treehouse
        var studentProfile = new Profile(username);
        studentProfile.on("end",function(profileJSON){
            //show profile
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profilename,
                badges: profileJSON.bagdes.length,
                javasriptPoints: profileJSON.points.JavaScript
            }
            response.write(values.username + "has" + values.badges + "badges");
            response.end("Footer");
        });
        studentProfile.on("error", function (error) {
            response.write(error.message);
            response.end("Footer");
        });
    }
}

module.exports.homeRoute = homeRoute;
module.exports.userRoute = userRoute;