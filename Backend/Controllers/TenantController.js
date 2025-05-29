const TenantModel=require("../Model/TenantModel");
const BuildingModel=require('../Model/BuildingModel');
const FlatDetailsModel=require("../Model/FlatsModel")
const getTenantsDetaislFunction=async (req,res)=>{
    try {
        const allTenantsDetails=await TenantModel.find({});
        res.status(200).json({
            success:true,
            message:"added new tenant",
            allTenantsDetailsArray:allTenantsDetails
        })
    } catch (error) {
        console.log("Error in backend getting tenants detals",error);
        res.status(400).json({
            success:false,
            message:"Error in backend while geting all tenant details",
        })
    }
}



const addnewTenantDetailsFunction=async(req,res)=> {
    console.log("BODY PART",req.body);
   const {name,
          email,
          mobile,
          address,
          city,
          state,
          gender,
          flatType,
          floor,
          bedNo,
          buildingName,
          flatNumber,
          feesAllotted,
          admissionDate}=req.body
    try {
        const ifEmailOfTenantExists=await TenantModel.findOne({email})
        if(ifEmailOfTenantExists){
            return res.status(400).json({
                success:false,
                message:"Email of Tenant already exists"
            })
        }

        const ifBedNoOfTenantExists=await TenantModel.findOne({bedNo});
        if(ifBedNoOfTenantExists){
            return res.status(400).json({
                success:false,
                message:"Bed of Tenant already booked"
            })
        }



        const newTenantDetails=await TenantModel.create(req.body);
        const updatedBuildingDetails=await BuildingModel.findOneAndUpdate(
            {name:newTenantDetails.buildingName},
             { $inc: { availableBeds: -1 } },
             {new:true}
        )
           console.log(updatedBuildingDetails);
           
        // const buildingObject=await BuildingModel.find({buildingName});
        // console.log(buildingObject.bedsPerFloor,buildingObject.flatsPerFloor);
        // let y=buildingObject.flatsPerFloor
        // let x=buildingObject.bedsPerFloor;
        const bedsPerFlat=updatedBuildingDetails.bedsPerFloor/updatedBuildingDetails.flatsPerFloor;
        console.log(bedsPerFlat);
        

        let flat = await FlatDetailsModel.findOne({ flatNumber });
    
        // ✅ Step 3: If not, create new flat
        if (!flat) {
       
        flat = await FlatDetailsModel.create({
        flatNumber,
        floorNo: floor,
        beds:bedsPerFlat , // You can update this as per actual data
        tenants: [newTenantDetails.name],
        flatType,
        name: buildingName,
         });
       } else {
         // ✅ Step 4: Flat exists, push tenant name
          await FlatDetailsModel.findOneAndUpdate(
          { flatNumber },
          { $push: { tenants: newTenantDetails.name } },
          { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully added new tenant",
      newTenantDetails,
      flatUpdatedOrCreated: flat,
    });
       
        
    } catch (error) {
        console.log("Error in backed whle add new tenant",error);
        res.status(400).json({
            success:false,
            message:"Error in backend while adding new tenant",
        })
        
    }
}

const deleteTenantDetailFunction=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedTenant=await TenantModel.deleteOne({_id:id});
        // console.log(deletedTenant);
        res.status(200).json({
            success:true,
            message:"successfully deleted tenat details",
        })
    } catch (error) {
        console.log("Error in deleting tenant ,backend",error);
        res.status(400).json({
            success:false,
            message:"Error in deleting tenant ,backend"
        })
    }
}



const getTenantsFullDetailsFuncion=async(req,res)=>{
    try {
        const {email}=req.params;
        // console.log(email);
        
        const ifTenantExists=await TenantModel.findOne({email});
        console.log("if tenenats Exits",ifTenantExists);
        res.status(200).json({
            success:true,
            message:"successfully found tenat details",
            ifTenantExists:ifTenantExists
        })

    } catch (error) {
        console.log("Error in finding tenant ,backend",error);
        res.status(400).json({
            success:false,
            message:"Error in finding tenant ,backend"
        })
    }
}

const bedRequestFormFunction =async (req,res)=>{
    try {
        const newTenantDetails=await TenantModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully requested for a new  tenant",
            newTenantDetails,
     });
        
    } catch (error) {
        console.log("Error in backed while request for bed of new tenant",error);
        res.status(400).json({
            success:false,
            message:"Error in backed while request for bed of new tenant",
        })
        
    }
}

module.exports={addnewTenantDetailsFunction,getTenantsFullDetailsFuncion,
    getTenantsDetaislFunction,bedRequestFormFunction,deleteTenantDetailFunction}