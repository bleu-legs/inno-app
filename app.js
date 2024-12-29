const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const { getIPAddress } = require('./utils/functions');
const { initializeLogger } = require('./utils/logger');
const { routes } = require('./routes/urls');
const urls = require('./routes/urls');
const { connection, createUser, deleteUser, validateUser, createSessionToken, validateSessionToken } = require('./database/db');

const logger = initializeLogger();
const serverIP = getIPAddress();

const port = 3000;

urls(app)

app.listen(port, '0.0.0.0', () => {
    logger.info('Bleu Legs App [v1.0]')
    logger.info(`Access at ${serverIP}:${port}`)

    createUser('Root', 'root@bleulegs.app', 'bleulegs', (err, userId) => {
        if (err) {
          console.error('Failed to create user');
        } else {
          console.log('User created with ID:', userId);
        }
    });
});