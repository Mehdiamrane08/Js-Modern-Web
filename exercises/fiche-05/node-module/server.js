// modules integrated to the runtime environment
let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");

// external package
const mime = require("mime");

// own module
let {
  printFileHyperlinks,
  asyncPrintFileHyperlinks,
} = require("./utils/hyperlinks.js");

let webFolderPath = "/www";

/* Create an HTTP server.
The callback is called for every client request : function(request, response)
*/
var serverHTTP = http.createServer(function (request, response) {
  let myURL = url.parse(request.url);
  console.log("Ressource requested : " + myURL.pathname.substr(1));

  // if no ressource is requested, list the files given in /www
  if (myURL.pathname === "/") {
    const hyperlinkListOuterHtml = printFileHyperlinks("/www");

    response.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Language": "fr",
    });
    //Write the content of the file in the response to be sent back to the client
    // end the response
    console.log("hyper list ?", hyperlinkListOuterHtml);
    return response.end(hyperlinkListOuterHtml);
  } else if (myURL.pathname === "/async") {
    console.log("start async operation");
    asyncPrintFileHyperlinks("/www", (hyperlinkListOuterHtml) => {
      console.log("async hyper list ?", hyperlinkListOuterHtml);
      response.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Language": "fr",
      });
      return response.end(hyperlinkListOuterHtml);
    });
  } else {
    let localPath = __dirname + webFolderPath + myURL.pathname;
    let fileExtension = path.extname(localPath);
    // asynchronous read operation
    fs.readFile(localPath, function (err, data) {
      if (err) {
        // the ressource was not found on the servor. Provide the error status code.
        // the MIME type is an html file
        console.log("err:", err.toString());
        response.writeHead(404, {
          "Content-Type": "text/html",
          "Content-Language": "fr",
        });
        //response.write(err.toString());
        response.end(err.toString());
      } else {
        /* the ressource was found. Provide status code 200 confirming that everything is OK
        200 signifie que tout est OK
        the MIME type is text/html / application/javascript / text/css / image/jpeg ....
      */

        // get the MIME type thanks to the mime package
        let mimeType = mime.getType(localPath);

        console.log(
          " - fileExtension:",
          fileExtension,
          "MIME type :",
          mimeType
        );

        response.writeHead(200, {
          "Content-Type": mimeType,
          "Content-Language": "fr",
        });
        //Write the content of the file in the response to be sent back to the client
        // end the response
        response.end(data.toString());
      }
    });
  }
});
// listen on the 777 port
serverHTTP.listen(666);
console.log("Server is started");
