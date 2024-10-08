const express=require("express")
const cors=require('cors');
require('dotenv').config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api - node"})
})

const authRouter=require("./Routes/authRoutes.js")
app.use("/auth",authRouter)

const userRouter=require("./Routes/userRoute.js");
app.use("/api/users",userRouter)

const productRouter=require("./Routes/customerProductRoutes");
app.use("/api/products",productRouter);

const adminProductRouter=require("./Routes/adminProductRoutes");
app.use("/api/admin/products",adminProductRouter);

const cartRouter=require("./Routes/cartRoutes.js")
app.use("/api/cart", cartRouter);

const cartItemRouter=require("./Routes/cartItemRoutes.js")
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./Routes/orderRoutes.js");
app.use("/api/orders",orderRouter);

const paymentRouter=require("./Routes/paymentRoutes");
app.use('/api/payments',paymentRouter)

const reviewRouter=require("./Routes/reviewRoute.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./Routes/ratingRoutes.js");
app.use("/api/ratings",ratingRouter);

// admin routes handler
const adminOrderRoutes=require("./Routes/adminOrderRoutes");
app.use("/api/admin/orders",adminOrderRoutes);

app.post('/feedback', (req, res) => {
    const { emoji, rating, comments } = req.body;

    console.log('Received feedback:');
    console.log('Emoji:', emoji);
    console.log('Rating:', rating);
    console.log('Comments:', comments);

    // Here you can save the feedback to a database or send it via email
    res.status(200).send({ message: 'Feedback received' });
});

module.exports={app};