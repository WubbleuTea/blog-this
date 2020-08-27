const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// /api/posts get all posts
router.get('/', (req, res) => {
    Post.findAll({
        //may need more here once we put comments//user

    })
    .then(dbPostData => {
        //need to come back for the session
            res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// api/posts/:id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        //need to come back for the session
            res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// api/posts/ create new post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => {
        //need to come back for the session
            res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// api/posts/:id update user
router.put('/:id', (req,res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        }, 
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData[0]) {
            res.status(404).jason({ message: 'No user found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// api/posts/:id delete a user
router.delete('/:id', (req, res) => {
// will need to delete all comments
    Comment.destroy({
        where: {
        post_id: req.params.id
        }
    }).then(() => {
        Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

module.exports = router;