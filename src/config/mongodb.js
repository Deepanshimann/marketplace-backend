const mongoose = require("mongoose")

const mongoDbUrl='mongodb+srv://deepanshimann96:ZeeK7uC8a317T6kz@cluster0.rgzxrs7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}