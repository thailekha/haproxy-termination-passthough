const express = require("express");
const https = require("https");
const fs = require("fs");

function dir(dirPath) {
  return require("path").resolve(__dirname, dirPath);
}

function serve(port) {
  // https
  const httpsApp = express();
  httpsApp.get("/", function(req, res) {
    res.json({
      port,
      headers: req.headers
    });
  });

  const httpsOptions = {
    key: fs.readFileSync(dir(`nodekey/selfsigned.key`)),
    cert: fs.readFileSync(dir(`nodekey/selfsigned.crt`))
  };

  https.createServer(httpsOptions, httpsApp).listen(port, () => {
    console.log(`httpsApp listening on port ${port}`);
  });
}

serve(9000);
serve(9001);
serve(9002);