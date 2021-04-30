const setupRoutes = require('./routes');
const packageJson = require('../../package.json');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

setupRoutes(app);

const ip = process.env.IP || packageJson.config.ip;
const port = process.env.PORT || packageJson.config.port;

const webServer = server.listen(port, ip, () => {
    console.log(
        'Express server listening on port: %d at IP: %s',
        webServer.address().port,
        webServer.address().address
    );
});

// Cleans up whenever the app crashes.
process.on('uncaughtException', err => {
    console.log('Crashed...', err);
    process.exit(0);
});
// Cleans up whenever getting interrupted by an user (ctrl + c).
process.on('SIGINT', err => {
    console.log('Interrupted by an user...', err);
    process.exit(0);
});

// Cleans up whenever getting a default terminate signal.
process.on('SIGTERM', err => {
    console.log('Got a default terminate signal...', err);
    process.exit(0);
});

process.once('SIGUSR2', function () {
    console.log('Restart server')
    process.kill(process.pid, 'SIGUSR2');
});

module.exports = exports = app;
