const router = require('express').Router();
const homeRoutes = require('./home-routes');

// router.use((req, res) => {
//     res.status(404).end();
// });
router.use('/', homeRoutes)
module.exports = router;