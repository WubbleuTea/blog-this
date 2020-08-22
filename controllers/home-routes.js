const router = require('express').Router();
// const sequelize = require('../config/connection');


router.get('/', (req, res) => {
    res.render('homepage')
})

 // /login
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     console.log('logging in')
    //     return;
    // }
    
    res.render('login');
});

module.exports = router;