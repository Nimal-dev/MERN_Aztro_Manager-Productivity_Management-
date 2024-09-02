const express = require('express')
const router = express.Router()

const userController = require('./user.controller')

router.post('/completetask', userController.completetask)
router.post('/updatetask', userController.updatetask)
router.post('/getCompletedTasks', userController.getCompletedTasks)
router.post('/getsingletask', userController.getsingletask)
router.post('/updatesingletask', userController.updatesingletask)
router.get('/getTaskCompletionHistory/:id', userController.getTaskCompletionHistory);




// router.post('/addfeedback', userController.addfeedback)


module.exports = router