const express = require ('express');
router = express.Router();
const userController = require('../controllers/userContoller');


//route to get all users
router.get('/users', userControllers.getAllUsers);
//Route to serach ID
router.get('/users/:id', userControllers.getUserById);
//Route to serach genre
router.get('/users/:genre', userControllers.getUserByGenre);


//Route to create new user
router.post('/users',userControllers.createUser);
router.put('/users', userControllers.updateUser);


//router delete user


router.delete('/users', userControllers.deleteUser);
module.exports=router;
