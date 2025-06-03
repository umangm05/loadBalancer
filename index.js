// index.js
require("dotenv").config();
const app = require("express")();
const server = require('http').createServer(app);
const axios = require("axios");
const child_process = require("child_process");
const serverPort = Number(process.env.SERVER_PORT);
const NumberOfServers = Number(process.env.NUMBER_OF_SERVERS);

let ServerToBeRequestedNext = 0;

const decideServerRoundRobin = () => {
    const requestServer = serverPort + ServerToBeRequestedNext + 1;
    ServerToBeRequestedNext == NumberOfServers - 1
        ? (ServerToBeRequestedNext = 0)
        : ServerToBeRequestedNext++;
    return requestServer;
};


app.all("*", async (req, res) => {
    res.redirect(307, `${process.env.URL}:${decideServerRoundRobin()}${req.url}`);
    console.log("CURRENT REQUEST", ServerToBeRequestedNext, req.url);
});

const startServer = (port) => {
    console.log(`Server Started on port ${port}`);
    child_process.exec(
        `node ${process.env.SERVER_PATH} --port=${port}`,
        (err, stdout, stderr) => {
            if (stderr) {
                console.error(`Server Killed on Port:${port}`, stderr);
                startServer(port);
                return;
            }
            console.log(">>>>>>", stdout);
        }
    );
};

const startAllServers = () => {
    for (let i = 1; i <= NumberOfServers; i++) {
        const serverNumber = serverPort + i;
        axios
            .get(`${process.env.URL}:${serverNumber}/status`)
            .then((res) => {
                console.log(
                    "🚀 ~ file: index.js ~ line 17 ~ setInterval ~ res",
                    res.status
                );
            })
            .catch((e) => {
                startServer(serverNumber);
            });
    }
};

startAllServers();

server.listen(3000, () => {
    console.log(`Load Balancer listening on port ${process.env.SERVER_PORT}`);
});
