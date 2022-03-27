const User= require('../models/User');




exports.register= async (req,res)=>{

const {name,email,password,confirmPassword,userType}= req.body;
if (!name||!email||!password||!confirmPassword||!userType) {
    res.status(500).send('Please Fill The Values for All Fields')
}
const user= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword,
    userType:req.body.userType
});
res.status(200).json({messsage:"User Created",user})
}
exports.login= async (req,res)=>{
    res.send('Login User')
}