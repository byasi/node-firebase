const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/create',UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;