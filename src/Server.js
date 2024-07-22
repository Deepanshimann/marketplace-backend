const app = require("./App");
const {connectDB} = require("./config/mongodb"); // Ensure this path is correct
const PORT = 3100;

connectDB().then(() => {
  
  app.listen(PORT, (err) => {
    console.log('Connected to the database successfully');
    if (err) {
      console.error("Error starting the server:", err);
    } else {
      console.log(`Server is running on http://localhost:${PORT}`);
    }
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process with a failure code
});
