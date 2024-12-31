const path = require('path')

module.exports = (app) => {
    app.get('/', (req, res) => { 
        res.sendFile(path.join(__dirname, '../', 'public', 'login.html')); 
    });

    app.get('/dev', (req, res) => { 
        res.sendFile(path.join(__dirname, '../', 'public', 'dev', 'debug.html')); 
    });
}