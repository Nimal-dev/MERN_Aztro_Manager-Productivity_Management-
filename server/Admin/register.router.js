const express = require('express')
const router = express.Router()

const userController = require('./register.controller')

router.post('/adduser', userController.addUser)
router.get('/viewuser', userController.viewUser)
router.post('/deleteUser', userController.deleteUser);


router.post('/addtask', userController.addTask)
router.get('/viewtask', userController.viewTask)
router.post('/viewTaskById', userController.viewTaskById)
router.post('/deletetask', userController.deleteTask)
router.post('/findtask', userController.findTask)
router.post('/editTask', userController.editTask)
router.post('/findsingletask', userController.findsingletask)

router.post('/login', userController.logIn)
router.get('/viewallusers', userController.viewallusers)
router.post('/creategrouptask', userController.creategrouptask)
router.get('/viewgrouptask', userController.viewgrouptask)
router.post('/viewgrouptaskById', userController.viewgrouptaskById)
router.post('/findgrouptask', userController.findgrouptask)
router.post('/updategrouptask', userController.updategrouptask)
router.post('/deletegrouptask', userController.deleteGroupTask);
router.post('/updateGroupTaskCompletion', userController.updateGroupTaskCompletion);


router.post('/addfeedback', userController.addFeedback);
router.get('/feedbacks', userController.getAllFeedbacks);
router.post('/deleteFeedback', userController.deleteFeedback);



router.post('/updateTaskCompletion', userController.updateTaskCompletion);
router.get('/getTaskCompletionHistory', userController.getTaskCompletionHistory);



router.post('/markAttendance', userController.markAttendance);
router.post('/viewAttendance', userController.viewAttendance);
router.post('/getAttendance', userController.getAttendance);
router.get('/getAllAttendance', userController.getAllAttendance);


module.exports = router