const mongoose = require("mongoose");
const models = require("../Admin/register.model");
const registerModel = models.register;
const taskmodel = models.addTask;
const loginModel = models.login;
const grouptaskModel = models.GroupTask;
const TaskCompletion = models.TaskCompletion;

exports.completetask = async (req, res) => {
  try {
    const task = await grouptaskModel.findById(req.body.id).populate("clientid");
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatetask = async (req, res) => {
  try {
    const task = await grouptaskModel.findById(req.body.id);
    if (task) {
      task.status = 1;
      task.completedDate = new Date(); // Set the completion date

      await task.save();

      // Calculate efficiency
      const deadline = new Date(task.deadline);
      const completedDate = new Date(task.completedDate);
      const isEfficient = completedDate <= deadline;

      res.json({
        message: "Task completed",
        efficiency: isEfficient
          ? "Task completed on time"
          : "Task completed late",
      });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCompletedTasks = async (req, res) => {
  const { userId } = req.body; // Assuming the user ID is sent in the request body
  console.log("Received userId:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    const tasks = await grouptaskModel.find({ status: 1 });
    console.log("Fetched tasks:", tasks);

    const taskData = tasks.map((task) => {
      const deadline = new Date(task.deadline);
      const completedDate = new Date(task.completedDate);
      const isEfficient = completedDate <= deadline;
      return {
        taskname: task.taskname,
        efficiency: isEfficient ? "Efficient" : "Inefficient",
        completedDate: task.completedDate,
        deadline: task.deadline,
      };
    });

    res.json(taskData);
  } catch (error) {
    console.error("Error fetching completed tasks", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getsingletask = async (req, res) => {
  const getsingletask = await taskmodel.findById(req.body.id);
  res.json(getsingletask);
};

exports.updatesingletask = async (req, res) => {
  try {
    await taskmodel.findByIdAndUpdate(req.body.id, {
      status: 1,
    });
    res.json("success");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.getTaskCompletionHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the task to get its creation date and deadline
    const task = await taskmodel.findById(id);
    const { createdAt, deadline } = task;

    // Fetch all completion records for the task
    const completionHistory = await TaskCompletion.find({ task: id }).sort({ date: 1 });
    console.log(completionHistory, "Completion History");

    // Initialize an array to hold the complete date range
    const completeHistory = [];
    let currentDate = new Date(createdAt).setHours(0, 0, 0, 0);
    const endDate = new Date(deadline).setHours(0, 0, 0, 0);

    // Fill in completion data for each day from task creation to deadline
    let lastKnownCompletion = 0;
    while (currentDate <= endDate) {
      const recordForTheDay = completionHistory.find(record => new Date(record.date).getTime() === currentDate);
      if (recordForTheDay) {
        lastKnownCompletion = recordForTheDay.completion;
      }
      completeHistory.push({ date: new Date(currentDate), completion: lastKnownCompletion });
      currentDate = new Date(currentDate).setDate(new Date(currentDate).getDate() + 1);
    }

    res.json(completeHistory);
  } catch (error) {
    console.error("Error fetching task completion history:", error);
    res.status(500).json({ error: "Error fetching task completion history" });
  }
};