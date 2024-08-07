const { app } = require("./App.js");
const { connectDb } = require("./config/mongodb.js");
const userService=require("./services/user-services.js")


const PORT=3100;
app.listen(PORT,async ()=>{
    await connectDb()
    // userService.initializeAdminUser()
    console.log("ecommerce api listing on port ",PORT)
})