const userService=require("../services/user-services.js")
const jwtProvider=require("../config/jwtProvider.js")
const bcrypt=require("bcrypt")
const cartServiceFirst=require("../services/cart-services/create-cart.js");
const cartServiceSecond=require("../services/cart-services/findUserCart.js");


const register=async(req,res)=>{

    try {
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);

        await cartServiceFirst.createCart(user);

        return res.status(200).send({jwt,message:"register success"})

    } catch (error) {
      console.error("Error during registration:", error); 
        return res.status(500).send({error:error.message+"no message"})
    }
}
const login=async(req,res)=>{
    const {password,email}=req.body
    try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found With Email ', email});
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid password' });
        }

        const jwt=jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt,message:"login success"});

    } catch (error) {
      console.error("Error during login:", error);
        return res.status(500).send({error:error.message})
    }
}
module.exports={register,login}