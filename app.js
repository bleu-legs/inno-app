const express = require('express');
const path = require('path');
const app = express();
const { initializeLogger } = require('./utils/logger');
app.use(express.static(path.join(__dirname, 'public')));
const logger = initializeLogger();
const { getIPAddress } = require('./utils/functions');
const serverIP = getIPAddress();

const port = 3000;

app.get('/', (req, res) => {
  res.redirect('/home.html');
});

app.listen(port, '0.0.0.0', () => {
    logger.info('Bleu Legs App [v1.0]')
    logger.info(`Access at ${serverIP}:${port}`)
});