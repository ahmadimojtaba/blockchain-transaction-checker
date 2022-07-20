const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = class Application
{
    constructor()
    {
        this.configServer();
        this.setConfig();
        this.setRoutes();
    }

    configServer()
    {
        const port = 3000;
        const server = http.createServer(app);
        server.listen(port, () => {
          console.log(`server run on port ${port}`);
        });
    }

    setConfig()
    {
        app.set('view engine' , 'ejs');
        app.set('views' , path.resolve('./views'));
        app.set(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
    }

    setRoutes()
    {
        app.use(require('./routes'));
    }
}
