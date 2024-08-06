// server.js or app.js (backend)
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from the frontend running on port 5173
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Test connection route
app.get('/test', (req, res) => {
  res.json({ success: true, message: 'Connection is successful!' });
});

// Routes
const authRoutes = require("./Routes/authRoutes");
const userRoute = require("./Routes/userRoute");
const customerProductRouter = require("./Routes/customerProductRoutes.js");
const adminProductRouter = require("./Routes/adminProductRoutes.js");
const cartRouter = require("./Routes/cartRoutes.js");
const cartItemRouter = require("./Routes/cartItemRoutes.js");
const orderRouter = require("./Routes/orderRoutes.js");
const reviewRouter = require("./Routes/reviewRoute.js");
const ratingRouter = require("./Routes/ratingRoutes.js");
const adminOrderRouter = require("./Routes/adminOrderRoutes");

app.use("/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/products", customerProductRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/admin/orders", adminOrderRouter);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
