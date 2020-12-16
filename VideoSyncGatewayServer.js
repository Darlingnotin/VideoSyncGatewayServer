// Copyright (c) 2020 Danielle Arlington.

// This program is free software: you can redistribute it and/or modify  
// it under the terms of the GNU General Public License as published by  
// the Free Software Foundation, version 3.
// https://www.gnu.org/licenses/gpl-3.0.en.html

var fs = require("fs");
var os = require("os");
var express = require("express");
var app = express();
var port = 7080;
var server = app.listen(port);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });

app.get("/", function (req, res) {
  fs.createReadStream("videoSync.html").pipe(res);
});
app.get('/assets/clickToWatch.png', (req, res) => {
  res.sendFile('./assets/clickToWatch.png', { root: __dirname });
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
console.log("Video Sync Gateway Server");
console.log("Website URL http://" + os.networkInterfaces().Ethernet[1].address + ":" + port);
