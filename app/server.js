// Server.js
require('dotenv').config()
const express = require("express");
const app = express();
const socket = require("socket.io-client")(`${process.env.URL}:${process.env.SERVER_PORT}`);
const os = require("os");

socket.on('connect', function () {
    // socket connected
    setInterval(() => {
        // RAM USED tot - free
        let ramUsed = Math.round(os.totalmem()) - Math.round(os.freemem());
        // RAM percentage
        let ram = (ramUsed * 100 / Math.round(os.totalmem())).toFixed(0);
        console.log(ram + '%')
        // CPU USAGE PERCENTAGE
        // cpu.usage().then(cpu => socket.emit('ram-usage', { ram, cpu, username, osInfo }))
    }, 1000);
});

const serverConfigs = {};

process.argv.forEach((conf) => {
    if (conf.includes("--port")) {
        serverConfigs["port"] = conf.split("=")[1];
    }
});

console.log("🚀 ~ file: server1.js ~ line 8 ~ serverConfigs", serverConfigs);

app.get("/status", (req, res) => {
    res.sendStatus(200);
});

app.post("/invoke", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        //some task
        sum += i;
    }
    setTimeout(res.send("Hello World! from server1 " + sum), 5000);
    return;
});

app.get("/", (req, res) => {
    for (let i = 0; i < 1e9; i++) {
        //some task
    }
    res.send("online");
});

app.post("/kill", (req, res) => {
    process.abort();
});

if (serverConfigs.port)
    app.listen(serverConfigs.port, () => {
        console.log(`server1 listening on port ${serverConfigs.port}`);
    });
