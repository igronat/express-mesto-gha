const router = require('express').Router();

const {createUser, getUsers, getUserId, updateUser, updateAvatar} = require('../controllers/users')

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserId);
router.patch('/users/me/:id', updateUser);
router.patch('/users/me/:id/avatar', updateAvatar);

module.exports = router;
