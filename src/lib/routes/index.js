const express = require('express');
const dataRoutes = require('./data');
const customerRoutes = require('./customer');
const orderRoutes = require('./order');
const recommendationRoutes = require('./recommendation');

const { Router } = require('express');

const serverStartTimestamp = new Date();

function setupRoutes(app) {
    app.get('/ping', (req, res) =>
        res.json({
            uptimeInSec: (new Date().getTime() - serverStartTimestamp.getTime()) / 1000
        })
    );
    app.get('/health', (req, res) =>
        res.json({
            version: packageJson.version,
            self: {
                name: packageJson.name,
                status: 200,
                serverTimestamp: new Date().toString(),
            },
            dependencies: {
                http: []
            }
        })
    );
    app.use(express.json());
    app.use(`/api/`, setupApiRoutes());

    // All not-found API endpoints should return a custom 404 page.
    app.route('/:url(api)/*').get((req, res) =>
        res.status(404).send({ message: 'Page not found!' })
    );

    return app;
}

function setupApiRoutes() {
    const router = Router();

    router.use('/data', dataRoutes);
    router.use('/customer', customerRoutes);
    router.use('/order', orderRoutes);
    router.use('/recommendation', recommendationRoutes);

    return router;
}

module.exports = exports = setupRoutes;