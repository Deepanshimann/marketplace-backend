const mongoose = require('mongoose');
const mongodbUrl="mongodb+srv://deepanshimann96:ZeeK7uC8a317T6kz@cluster0.rgzxrs7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB=()=>{
  return mongoose.connect(mongodbUrl);
}
module.exports={connectDB}