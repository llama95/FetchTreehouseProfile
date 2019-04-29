var routes = require("./routes");
//create a listening web server
var http = require("http");
var https = require("https");
http.createServer(function(request, response) {
    routes.homeRoute(request, response);
    routes.userRoute(request, response);
}).listen(8080);
//     setTimeout(function(){
//         response.end('Goodbye World\n');
//     }, 100);
//
//     response.write("Hello World\n");
// }).listen(3000);
console.log('localhost/3000');

