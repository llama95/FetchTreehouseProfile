const fs = require("fs");
//read from the template files and
// insert values into the content
// write out the response
function view(templateName,values,response) {
    var data = fs.readFileSync('./views/' + templateName + ".html");

    response.write(data);
}
module.exports.view = view;