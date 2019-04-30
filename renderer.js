const fs = require("fs");

function mergeValues(values,content) {
//    cycle over the keys
//    replace all {{key}} w values from value object
//    return merged content
    for (var key in values){

        var content = content.replace("{{" + key + "}}",values[key]);
    }
    return content;
}


//read from the template files and
// insert values into the content
// write out the response
function view(templateName,values,response) {
    var data = fs.readFileSync('./views/' + templateName + ".html",{encoding: "utf8"});


    data = mergeValues(values,data);
    response.write(data);
}
module.exports.view = view;