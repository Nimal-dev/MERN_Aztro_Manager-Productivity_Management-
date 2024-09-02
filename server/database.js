const mongoose =require('mongoose')


function connection(){
    mongoose.connect('mongodb://localhost:27017/ProductivityData')
    .then(()=>console.log('Mongodb connected...'))
    .catch((error)=>{console.log(error)})
}

module.exports = connection
