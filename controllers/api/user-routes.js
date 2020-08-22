const router = require('express').Router();

const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
       // may need to include posts and comments
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        //need to come back for the session
            res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// will need a login post

// will need a logout post

// api/users/:id update user
router.put('/:id', (req,res) => {
    // if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).jason({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// api/users/:id delete a user
router.delete('/:id', (req, res) => {
// will need to delete all comments
    User.destroy({
        where : {
            id : req.params.id
        }
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;