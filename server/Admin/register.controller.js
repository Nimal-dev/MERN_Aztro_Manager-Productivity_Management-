const models = require("./register.model");
const registerModel = models.register;
const taskmodel = models.addTask;
const loginModel = models.login;
const grouptaskModel = models.GroupTask;
const Feedback = models.feedback;
const Attendance = models.Attendance;
const TaskCompletion = models.TaskCompletion;

exports.addUser = async (req, res) => {
  try {

    const existingUser = await loginModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }


    const registerparam = {
      name: req.body.name,
      qualification: req.body.qualification,
    };

    const registerData = await registerModel.create(registerparam);

    const loginparam = {
      email: req.body.email,
      password: req.body.password,
      userStatus: req.body.userStatus,
      userid: registerData._id,
    };

    await loginModel.create(loginparam);

    res.json("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "registration failed" });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await registerModel.findByIdAndDelete(id);
    await loginModel.findOneAndDelete({ userid: id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};


exports.logIn = async (req, res) => {
  try {
    let param = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await loginModel
      .findOne({ email: param.email })
      .populate("userid");
    // console.log(user);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Check if password matches
    if (user.password !== param.password) {
      return res.json({ error: "Invalid password" });
    }

    // Check user status
    if (user.userStatus === 0 || user.userStatus === 1 || user.userStatus === 2) {
      req.session.user = user; // Setting session with user details
      console.log(user);
      // Return user
      return res.json(user);
    } else {
      // Invalid user status
      return res.json({ error: "Invalid user status" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.viewUser = async (req, res) => {
  const userslist = await loginModel.find().populate("userid");
  res.json(userslist);
};

exports.addTask = async (req, res) => {
  let params = {
    client: req.body.client,
    task: req.body.task,
    priority: req.body.priority,
    deadline: new Date(req.body.deadline).setHours(0, 0, 0, 0),
    status: req.body.status,
  };
  params.deadline = new Date(params.deadline);

  await taskmodel.create(params);
  res.json("Task added");
};

exports.viewTask = async (req, res) => {
  const tasklist = await taskmodel.find().populate({
    path: 'client',
    populate: {
        path: 'userid'
    }
})
  const clientlist = await loginModel
    .find({ userStatus: 1 })
    .populate("userid");
  // console.log(tasklist);
  res.json({ tasklist, clientlist });
};

exports.viewTaskById = async (req, res) => {
  const { userid } = req.body;
  const tasklist = await taskmodel.find({ client: userid }).populate({
    path: 'client',
    populate: {
      path: 'userid'
    }
  });
  const clientlist = await loginModel.find({ userStatus: 1 }).populate("userid");
  
  res.json({ tasklist, clientlist });
};


exports.deleteTask = async (req, res) => {
  try {
    const deletetask = await taskmodel.findByIdAndDelete(req.body.id);
    // console.log(deletetask);
    res.json(deletetask);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};

exports.findTask = async (req, res) => {
  const gettask = await taskmodel.findById(req.body.id);
  const clientlist = await registerModel.findById({ _id: gettask.client });

  console.log(clientlist);
  res.json({ gettask, clientlist });
};

exports.editTask = async (req, res) => {
  try {
    const updateTask = await taskmodel.findByIdAndUpdate(req.body.id, {
      // client:req.body.client,
      task: req.body.tasks,
      priority: req.body.prioritys,
      deadline: req.body.deadlines,
    });
    res.json(updateTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};


// New Knob change
exports.updateTaskCompletion = async (req, res) => {
  try {
    const { id, completion } = req.body;
    const today = new Date().setHours(0, 0, 0, 0);

    // Update the task status
    const updateTask = await taskmodel.findByIdAndUpdate(id, {
      status: completion
    }, { new: true });

    // Check if there's already a completion record for today
    const existingRecord = await TaskCompletion.findOne({ task: id, date: today });

    if (existingRecord) {
      // Update the existing record for today
      existingRecord.completion = completion;
      await existingRecord.save();
    } else {
      // Create a new record for today
      await TaskCompletion.create({
        task: id,
        date: today,
        completion: completion
      });
    }

    res.json(updateTask);
  } catch (error) {
    console.error("Error updating task completion:", error);
    res.status(500).json({ error: "Error updating task completion" });
  }
};



exports.getTaskCompletionHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const completionHistory = await TaskCompletion.find({ task: id }).sort({ date: 1 });

    res.json(completionHistory);
  } catch (error) {
    console.error("Error fetching task completion history:", error);
    res.status(500).json({ error: "Error fetching task completion history" });
  }
};


exports.viewallusers = async (req, res) => {
  const userslist = await loginModel.find({ userStatus: 1 }).populate("userid");
  res.json(userslist);
};

exports.creategrouptask = async (req, res) => {
  const params = {
    clientid: req.body.clientid,
    taskname: req.body.taskname,
    priority: req.body.priority,
    deadline: req.body.deadline,
    description: req.body.description,
    teamLeader: req.body.teamLeader,
    status: req.body.status,
    createdAt: new Date(),
  };
  await grouptaskModel.create(params);
  res.json("Group Task added");
};

exports.viewgrouptask = async (req, res) => {
  const grouptasklist = await grouptaskModel.find();
  // .populate("userid")
  res.json(grouptasklist);
};

exports.deleteGroupTask = async (req, res) => {
  try {
    const taskId = req.body.id;
    await grouptaskModel.findByIdAndDelete(taskId);
    res.json({ success: true, message: "Group Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting group task" });
  }
};


exports.viewgrouptaskById = async (req, res) => {
  const userId = req.body.userid;
  try {
    const grouptaskById = await grouptaskModel.find({ clientid: userId });
    res.json(grouptaskById);
  } catch (error) {
    console.error("Error fetching group tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.findgrouptask = async (req, res) => {
  const getgrouptask = await grouptaskModel.findById(req.body.id);
  res.json(getgrouptask);
};

exports.updategrouptask = async (req, res) => {
  try {
    const updategrouptask = await grouptaskModel.findByIdAndUpdate(
      req.body.id,
      {
        clientid: req.body.clientid,
        taskname: req.body.taskname,
        priority: req.body.priority,
        deadline: req.body.deadline,
        description: req.body.description,
      }
    );
    res.json("update success");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.findsingletask = async (req, res) => {
  try {
    const getsingletask = await taskmodel.findById(req.body.id).lean();
    if (getsingletask) {
      getsingletask.efficiency = getsingletask.completedDate
        ? new Date(getsingletask.completedDate) <= new Date(getsingletask.deadline)
          ? "Efficient"
          : "Inefficient"
        : null;
      res.json(getsingletask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.addFeedback = async (req, res) => {
  const { title, description, user_id, email } = req.body;
  
  const newFeedback = Feedback({
      title,
      description,
      user_id,
      email
  });
  
  try {
      await newFeedback.save();
      res.json({ message: "Feedback submitted successfully" });
  } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
      const feedbacks = await Feedback.find().populate('user_id', 'name email');
      res.json(feedbacks);
  } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.body;
    await Feedback.findByIdAndDelete(id);
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Failed to delete feedback" });
  }
};

exports.updateGroupTaskCompletion = async (req, res) => {
  const { id, completion, status } = req.body;

  try {
    const task = await grouptaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completionPercentage = completion;
    task.status = status;

    await task.save();
    res.status(200).json({ message: 'Task completion updated successfully', task });
  } catch (error) {
    console.error('Error updating task completion:', error);
    res.status(500).json({ message: 'Failed to update task completion' });
  }
};






// ---------Attendance------------------

exports.markAttendance = async (req, res) => {
  try {
    const { userid, status } = req.body;
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Set to start of the day

    const existingAttendance = await Attendance.findOne({ userid, date });

    if (existingAttendance) {
      return res.json({ success: false, message: "Already clocked in for today" });
    }

    const attendance = new Attendance({ userid, date, status });
    await attendance.save();

    res.json({ success: true, message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { userid } = req.body;

    const attendance = await Attendance.find({ userid }).sort({ date: -1 });

    res.json({ attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find()
    .populate({
      path: 'userid',
      populate: {
        path: 'userid', 
        model: 'Register'
      }
    })

    res.json({ attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// View attendance
exports.viewAttendance = async (req, res) => {
  try {
    const { userid, month, year } = req.body;

    // Find attendance records for the given user and month/year
    const attendanceRecords = await Attendance.find({
      userid,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1)
      }
    });

    res.json(attendanceRecords);
  } catch (error) {
    console.error("Error viewing attendance:", error);
    res.status(500).json({ error: "Error viewing attendance" });
  }
};