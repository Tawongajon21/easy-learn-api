const mongoose= require('mongoose');

const userSchema=new  mongoose.Schema({
    name:{
        type:String,
        required:true,
   

    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true,
        max:20,
        min:6
    },
    confirmPassword:{
        type:String,
        required:true,
        max:20,
        min:6
    },
    userType:{
        type:String,
        required:true
    },
  id:{type:String}

});

const User= mongoose.model("User",userSchema);

module.exports= User