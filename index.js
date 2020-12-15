const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const es6Renderer = require("express-es6-template-engine");

const PORT = 3030;
const HOST = '127.0.0.1';

const Sequelize = require('sequelize');
// const { User } = require('./models');
const controllers = require('./controllers/controllers');


app.use(
	express.urlencoded({
		extended: true,
	})
);

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.get('/', controllers.home);

app.get('/form', controllers.newForm);

app.post('/form', controllers.postForm);

app.get('/thankyou', controllers.thankyou);



server.listen(PORT, HOST, ()=> {
    console.log('Swag.')
})