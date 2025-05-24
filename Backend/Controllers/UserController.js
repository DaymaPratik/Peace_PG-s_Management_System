const UserModel=require("../Model/UserModel")
const bc=require("bcryptjs");
const userLoginFunction=async(req,res)=>{
    // console.log(req.body);
    try { 
        const {email,password}=req.body;
        if(!(email && password)){
            return res.status(400).json({
                success:false,
                message:'Enter all feilds'
            })
        }
        const isUserPresent=await UserModel.findOne({email});
        if(!isUserPresent){
           return res.status(400).json({
                success:false,
                message:'Enter valid email'
            })
        }
        const isPasswordCorrect=await bc.compare(password,isUserPresent.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:'Enter valid password'
            })
        }
        res.json({
            success:true,
            message:"user login successfull",
            userDetails:isUserPresent
        })
    } catch (error) {
        console.log("Error in backend while Login user",error);
        
    }
}
const userRegisterFunction=async(req,res)=>{
    console.log("Request",req.body);
    try {
        const {name,email,mobile,address,password}=req.body
        const ifUserExists=await UserModel.findOne({email});
        if(ifUserExists){
            return res.status(400).json({
                success:false,
                message:"Admin Exixts Whit given email"
            })
        }
        const salt=await bc.genSalt(10);
        const hashedPassword=await bc.hashSync(password,10);
        const CreateNewUser=await UserModel.create({name,email,mobile,address,password:hashedPassword})
        res.json({
            success:true,
            message:"user registration successfull",
            userDetails:CreateNewUser
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Error registrating user"
        })
        console.log("Error in backend while registration user",error);
        
    }
}

module.exports={userLoginFunction,userRegisterFunction}