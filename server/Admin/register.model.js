const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    name: {type: String,required: true},
    qualification: {type: String,required: true}
})
const register = mongoose.model('Register', registerSchema)

const loginSchema = mongoose.Schema({
 
    email: {type: String,required: true},
    password: {type: String,required: true},
    userStatus: {type: Number},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"Register"}
})
const login = mongoose.model('Login', loginSchema)


// ----------Attendance Model-------------------
const attendanceSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true }, // Present, Absent, etc.
});

const Attendance = mongoose.model('Attendance', attendanceSchema);




const addTaskSchema = mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
    task: { type: String, required: true },
    priority: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: Number, required: true },
    completedDate: { type: Date },
    createdAt:{type:Date, 
      default:Date.now}
  });
  
  addTaskSchema.pre('save', function (next) {
    this.deadline = new Date(this.deadline.setHours(0, 0, 0, 0));
    next();
  });
  
  addTaskSchema.virtual('efficiency').get(function () {
    if (!this.completedDate) return null;
    const deadline = new Date(this.deadline);
    const completedDate = new Date(this.completedDate);
    return completedDate <= deadline ? 'Efficient' : 'Inefficient';
  });
  


const addTask = mongoose.model('Task', addTaskSchema)

const groupTaskSchema = mongoose.Schema({
  clientid: [{ type: mongoose.Schema.Types.ObjectId, ref: "Login" }],
  taskname: String,
  priority: String,
  deadline: Date,
  description: String,
  teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
  status: { type: Number, default: 0 }, // 0 for Not Completed, 1 for Completed
  completionPercentage: { type: Number, default: 0 }, // 0 to 100
  createdAt: { type: Date, default: Date.now },
});

const GroupTask = mongoose.model("GroupTask", groupTaskSchema);

const taskCompletionSchema = mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  date: { type: Date, required: true },
  completion: { type: Number, default: 0, required: true }
});

const TaskCompletion = mongoose.model('TaskCompletion', taskCompletionSchema);





const feedbackSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const feedback = mongoose.model('feedback', feedbackSchema);



module.exports = { register,addTask ,login, GroupTask, feedback, Attendance, TaskCompletion}