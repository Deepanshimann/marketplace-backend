// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const SECERET_KEY='deepheroineqwertyuio123'
// // process.env.SECERET_KEY
// const generateToken=(userId)=>{

//     const token=jwt.sign({id:userId},SECERET_KEY,{ expiresIn: '48h' })
//     return token;
// }

// const getUserIdFromToken=(token)=>{
//     const decodedToken=jwt.verify(token,SECERET_KEY)
//     return decodedToken.id
// }


// module.exports={generateToken,getUserIdFromToken};

require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'deepheroineqwertyuio123';

const generateToken = (userId) => {
  console.log("Generating token for user ID:", userId);
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '48h' });
  console.log("Generated token:", token);
  return token;
}

const getUserIdFromToken = (token) => {
  try {
    console.log("Verifying token:", token);
    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log("Decoded token:", decodedToken);
    return decodedToken.id;
  } catch (error) {
    console.log("Invalid token:", error.message);
    throw new Error("Invalid token");
  }
}

module.exports = { generateToken, getUserIdFromToken };
