const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models')


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

 // /login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        console.log('logging in')
        return;
    }
    
    res.render('login');
});

router.get('/signup', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     console.log('Already logged in')
    //     return;
    // }
    
    res.render('signup');
});

router.get('/dashboard', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     console.log('Already logged in')
    //     return;
    // }
    
    res.render('dashboard');
});
module.exports = router;