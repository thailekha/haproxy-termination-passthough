const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");

function dir(dirPath) {
  return require("path").resolve(__dirname, dirPath);
}

function handler(port) {
  return (req, res) => {
    const data = {
      title: 'Hey',
      requestingIP: `Requesting IP address: ${req.headers['x-forwarded-for']}`,
      proxyAddress: `HAproxy server address: ${req.connection.remoteAddress}`,
      port: `Instance that served page: ${port}`,
      headerInfo: `HTTP Header info: ${JSON.stringify(req.headers)}`
    };

    res.render('index', data);
  };
}

function serveHttp(port) {
  const httpApp = express();
  httpApp.set('view engine', 'pug');
  httpApp.get("*", handler(port));

  http.createServer(httpApp).listen({port, host: '0.0.0.0'}, () => {
    console.log(`httpApp listening on port ${port}`);
  });
}

function serveHttps(port) {
  const httpsApp = express();
  httpsApp.set('trust proxy', 'loopback');
  httpsApp.set('view engine', 'pug');
  httpsApp.get("*", handler(port));

  const httpsOptions = {
    key: fs.readFileSync(dir(`nodekey/selfsigned.key`)),
    cert: fs.readFileSync(dir(`nodekey/selfsigned.crt`))
  };

  https.createServer(httpsOptions, httpsApp).listen({port, host: '0.0.0.0'}, () => {
    console.log(`httpsApp listening on port ${port}`);
  });
}

serveHttp(3000);
serveHttp(3001);
serveHttp(3002);

serveHttps(5000);
serveHttps(5001);
serveHttps(5002);