// Importing required libraries
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Importing routers
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();

// Use middlewares
server.use(helmet());
server.use(cors());
server.use(express.json());

// Use Routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>API is running</h2>`);
});

module.exports = server;
