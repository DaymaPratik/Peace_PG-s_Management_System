const AdminModel=require("../Model/AdminModel")
const GaurdModel=require("../Model/GaurdModel")
const StaffModel=require('../Model/StaffModel')
const ComplainsModel=require('../Model/ComplainsModel')
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

async function addNewGaurdFunction(req,res){
    console.log(req.body);
    try {
        const newGaurdDetails=await GaurdModel.create(req.body);
        res.status(200).json({
            success:true,
            message:"Added gaurd details successfully",
            newGaurdDetails
        })
    } catch (error) {
        console.log("Error ading new security details in backend",error);
        res.status(400).json({
            success:false,
            message:"Error ading new security details in backend"
        })
        
    }
    

}

async function deleteGaurdFunction(req,res){
    const {id}=req.params;
    console.log(id);
    try {
        const deletedGaurdDetail=await GaurdModel.findOneAndDelete({_id:id});
        console.log(deletedGaurdDetail);
        res.status(200).json({
            success:true,
            message:"Deleted gaurd details successfullfy"
        })
        
    } catch (error) {
        console.log("Error deleting guard etails backend",error);
        res.status(400).json({
            success:false,
            message:"Error Deleting gaurd details backend"
        })
        
    }
}
async function deleteNewStaffDetailsFunction(){
    
}
async function getGaurdDetailsFunction(req,res){
    // console.log(req.body);
    try {
        const gaurdDetailsArray=await GaurdModel.find({});
        res.status(200).json({
            success:true,
            message:"Found all gaurds details successfully",
            gaurdDetailsArray
        })
    } catch (error) {
        console.log("Error finding all security details in backend",error);
        res.status(400).json({
            success:false,
            message:"Error finding all security details in backend"
        })
        
    }
    

}
async function addNewStaffDetailsFunction(req,res){
    console.log(req.body);
    try {
        const newStaffDetails=await StaffModel.create(req.body);
        res.status(200).json({
            success:true,
            message:"Added staff details successfully",
            newStaffDetails
        })
    } catch (error) {
        console.log("Error ading new staff details in backend",error);
        res.status(400).json({
            success:false,
            message:"Error ading new staff details in backend"
        })
}
}
async function getStaffDetailsFunction(req,res) {
     try {
        const staffDetailsArray=await StaffModel.find({});
        res.status(200).json({
            success:true,
            message:"Found all staff details successfully",
            staffDetailsArray
        })
    } catch (error) {
        console.log("Error finding all staff details in backend",error);
        res.status(400).json({
            success:false,
            message:"Error finding all staff details in backend"
        })
        
    }
}
async function deleteNewStaffDetailsFunction(req,res){
    const {id}=req.params;
    console.log(id);
    try {
        const deletedStaffDetail=await StaffModel.findOneAndDelete({_id:id});
        console.log(deletedStaffDetail);
        res.status(200).json({
            success:true,
            message:"Deleted staff details successfullfy"
        })
        
    } catch (error) {
        console.log("Error deleting staff etails backend",error);
        res.status(400).json({
            success:false,
            message:"Error Deleting staff details backend"
        })
        
    }
}
async function getAllRaiseComplaintsFunction(req,res){
try {
        const allComplains=await ComplainsModel.find({});
        res.status(200).json({
            success:true,
            message:"Getting all raised complaints successfully",
            allComplains:allComplains
        })
    } catch (error) {
        console.log("Error in getting all riased complaints backend",error);
        res.status(400).json({
            success:false,
            message:"Error  in getting all riased complaints backend",
        })
    }
}

module.exports={adminLoginFunction,adminRegisterFunction,getGaurdDetailsFunction,addNewGaurdFunction,getAllRaiseComplaintsFunction,
    addNewStaffDetailsFunction,deleteGaurdFunction,getStaffDetailsFunction,getStaffDetailsFunction,deleteNewStaffDetailsFunction}