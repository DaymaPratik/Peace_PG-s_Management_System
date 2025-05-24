const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        requrired:true
    },
    email:{
        type:String,
        requrired:true
    },
    mobile:{
        type:Number,
        requrired:true
    },
    address:{
        type:String,
        requrired:true
    },
    password:{
        type:String,
        required:true
    }
})
const UserModel=mongoose.model("User_Details",UserSchema);
module.exports=UserModel