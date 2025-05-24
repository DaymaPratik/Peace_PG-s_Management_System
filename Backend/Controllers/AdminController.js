const AdminModel=require("../Model/AdminModel")
const bc=require("bcryptjs");
const adminLoginFunction=async(req,res)=>{
    // console.log(req.body);
    try { 
        const {email,password}=req.body;
        if(!(email && password)){
            return res.status(400).json({
                success:false,
                message:'Enter all feilds'
            })
        }
        const isAdminPresent=await AdminModel.findOne({email});
        if(!isAdminPresent){
           return res.status(400).json({
                success:false,
                message:'Enter valid email'
            })
        }
        const isPasswordCorrect=await bc.compare(password,isAdminPresent.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:'Enter valid password'
            })
        }
        res.json({
            success:true,
            message:"Admin login successfull",
            adminDetails:isAdminPresent
        })
    } catch (error) {
        console.log("Error in backend while Login admin",error);
        
    }
}
const adminRegisterFunction=async(req,res)=>{
    console.log("Request",req.body);
    try {
        const {name,email,mobile,address,password}=req.body
        const ifAdminExists=await AdminModel.findOne({email});
        if(ifAdminExists){
            return res.status(400).json({
                success:false,
                message:"Admin Exixts Whit given email"
            })
        }
        const salt=await bc.genSalt(10);
        const hashedPassword=await bc.hashSync(password,10);
        const CreateNewAdmin=await AdminModel.create({name,email,mobile,address,password:hashedPassword})
        res.json({
            success:true,
            message:"Admin registration successfull",
            AdminDetails:CreateNewAdmin
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Error registrating Admin"
        })
        console.log("Error in backend while registration admin",error);
        
    }
}

module.exports={adminLoginFunction,adminRegisterFunction}