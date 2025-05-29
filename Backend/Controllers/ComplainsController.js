const ComplainsModel=require('../Model/ComplainsModel')
const raiseComplainFumction =async(req,res)=>{
    console.log(req.body);
    try {
        const newComplain=await ComplainsModel.create(req.body);
        res.status(200).json({
            success:true,
            message:"Raise a complain successfully",
            newComplain:newComplain,
        })
    } catch (error) {
        console.log("Error in raising complain backend",error);
        res.status(400).json({
            success:false,
            message:"Error in raising complain backend",
        })
    }
}


const getRaisedComplainsFunction=async(req,res)=>{
      const {email}=req.params;
    try {
        const allComplains=await ComplainsModel.find({email});
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


const deleteRaisedComplaintByTenantFunction=async(req,res)=>{
     const {id}=req.params
    try {
        const deletedComplain=await ComplainsModel.findOneAndDelete({_id:id});
        res.status(200).json({
            success:true,
            message:"Deleted complain successfully",
            newComplain:deletedComplain,
        })
    } catch (error) {
        console.log("Error in deleting complain backend",error);
        res.status(400).json({
            success:false,
            message:"Error in deleting complain backend",
        })
    }
}
module.exports={raiseComplainFumction,getRaisedComplainsFunction,deleteRaisedComplaintByTenantFunction}