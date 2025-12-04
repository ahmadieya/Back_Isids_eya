var express = require('express');
var router = express.Router();
const projectController = require('../controllers/projectController')
const {requireAuthUser}=require('../middlewares/auth')

router.post('/create',  requireAuthUser ,projectController.createProject);
router.get('/getallprojects',  projectController.getAllProjects);
router.get('/deleteproject/:id',  projectController.deleteProjectById);
router.get('/updateProject/:id',  projectController.updateProject);

module.exports = router;
