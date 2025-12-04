var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
//const {requireAuthUser}=require('../middlewares/auth')
//const {role}=require('../middlewares/role')


router.post('/add', userController.addManger);
//router.post('/addUser', userController.addUser);
router.get('/getall', userController.getAllUsers);
router.post('/login', userController.login);
router.post('/registre', userController.register);
module.exports = router;
