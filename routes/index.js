const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getUserById);

router.get('/users/course/:course', userController.getUserByCourse);

router.post('/users', userController.createUser);

router.put('/users', userController.updateUser);

router.delete('/users', userController.deleteUser);

module.exports = router;
