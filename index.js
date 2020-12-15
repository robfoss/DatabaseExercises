const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const es6Renderer = require("express-es6-template-engine");

const PORT = 3030;
const HOST = '127.0.0.1';

const Sequelize = require('sequelize');
const { User } = require('./models');

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            title: 'Welcome Page'
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer'
        }
    })
});

app.get('/form', (req, res) => {
    res.render('form', {
        locals: {
            title: 'Form Page',
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
    });
});

app.post('/form', async (req, res) => {
    const { name, age, email } = req.body;
    const newUser = await User.create({
        name,
        age,
        email
    });
    res.redirect('/thankyou');
})

app.get('/thankyou', async (req, res) => {
    const user = await User.findAll();
    res.render('thankyou', {
        locals: {
            title: 'Thank You',
            user,
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer'
        }
    })
})








server.listen(PORT, HOST, ()=> {
    console.log('Swag.')
})