const express=require("express")
const cors=require('cors');

const app=express();

app.use(express.json())
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

// const paymentRouter=require("./Routes/payment.routes.js");
// app.use('/api/payments',paymentRouter)

const reviewRouter=require("./Routes/reviewRoute.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./Routes/ratingRoutes.js");
app.use("/api/ratings",ratingRouter);

// admin routes handler
const adminOrderRoutes=require("./Routes/adminOrderRoutes");
app.use("/api/admin/orders",adminOrderRoutes);

module.exports={app};