var express = require('express');
var router = express.Router();
const projectController = require('../controllers/projectController')
const {requireAuthUser , requireManager}=require('../middlewares/auth')

router.post('/create',requireAuthUser,projectController.createProject);//lezem user andou compte bch yamel create
router.get('/getallprojects', requireManager, projectController.getAllProjects);//ken l manager ychouf les projets lkol
router.put('/updateProject/:id',  projectController.updateProject);
router.delete('/deleteproject/:id',  projectController.deleteProjectById);
router.get('/searchProjectByName',  projectController.searchProjectByName);
router.get('/sortProject',  projectController.sortProject);

module.exports = router;
