const { User } = require('../models');

const layout = {
    partials: {
        header: '/partials/header',
        footer: '/partials/footer'
    }
}

const home = (req, res) => {
    res.render('home', {
        ...layout,
        locals: {
            title: 'Welcome Page'
        }
    })        
}

const newForm = (req, res) => {
    res.render('form', {
        ...layout,
        locals: {
            title: 'Form Page',
        }
    })
}

const postForm = async (req, res) => {
    const { name, age, email } = req.body;
    const newUser = await User.create({
        name,
        age,
        email
    });
    res.redirect('/thankyou');
};

const thankyou = async (req, res) => {
    const user = await User.findAll();
    res.render('thankyou', {
        ...layout,
        locals: {
            title: 'Thank You',
            user,
        }
    })
}

module.exports = {
    home, 
    newForm,
    postForm,
    thankyou
}