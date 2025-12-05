var express = require('express');
var router = express.Router();
const tasksController = require('../controllers/tasksController')
const {requireManager}=require('../middlewares/auth')

router.post('/createTasks' ,tasksController.createTasks);
router.get('/getAllTasks' ,tasksController.getAllTasks);
router.put('/updateTasks/:id' ,tasksController.updateTasks);
router.delete('/deleteTask/:id' ,tasksController.deleteTask);
router.get('/searchTask',  tasksController.searchTask );
router.get('/sortTasks',  tasksController.sortTasks );
router.put('/affect',requireManager ,tasksController.affect); // ken l manager yamel affect


module.exports = router;