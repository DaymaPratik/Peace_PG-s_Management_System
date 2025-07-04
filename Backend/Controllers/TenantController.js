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

const addNewTenantDetailsFunction = async (req, res) => {
  const {
    name,
    email,
    bedNo,
    flatNumber,
    buildingName,
    floor,
    flatType,
    ...rest
  } = req.body;

  try {
    // Check if email or bed is already taken
    const [emailExists, bedExists] = await Promise.all([
      TenantModel.findOne({ email }),
      TenantModel.findOne({ bedNo })
    ]);

    if (emailExists)
      return res.status(400).json({ success: false, message: "Email already exists" });

    if (bedExists)
      return res.status(400).json({ success: false, message: "Bed already booked" });

    // Check flat
    let flat = await FlatDetailsModel.findOne({ flatNumber });

    if (!flat) {
      const building = await BuildingModel.findOne({ name: buildingName });
      if (!building) {
        return res.status(400).json({ success: false, message: "Building not found" });
      }

      const bedsPerFlat = building.bedsPerFloor / building.flatsPerFloor;

      // Create new flat
      flat = await FlatDetailsModel.create({
        flatNumber,
        floorNo: floor,
        beds: bedsPerFlat,
        availableBeds: bedsPerFlat, // Don't reduce here!
        tenants: [],
        flatType,
        name: buildingName
      });
    }

    // Flat exists — check if full
    if (flat.availableBeds === 0) {
      return res.status(400).json({
        success: false,
        message: "Flat is full, please create a new flat"
      });
    }

    // Create tenant
    const newTenantDetails = await TenantModel.create({
      name,
      email,
      bedNo,
      flatNumber,
      buildingName,
      floor,
      flatType,
      ...rest
    });

    // Update flat and building after tenant creation
    await Promise.all([
      FlatDetailsModel.findOneAndUpdate(
        { flatNumber },
        { $push: { tenants: name }, $inc: { availableBeds: -1 } }
      ),
      BuildingModel.findOneAndUpdate(
        { name: buildingName },
        { $inc: { availableBeds: -1 } }
      )
    ]);

    return res.status(200).json({
      success: true,
      message: "Tenant added successfully",
      newTenantDetails
    });
  } catch (err) {
    console.error("Error adding tenant", err);
    return res.status(500).json({
      success: false,
      message: "Server error while adding tenant"
    });
  }
};




const deleteTenantDetailFunction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTenant = await TenantModel.findByIdAndDelete(id);

    if (!deletedTenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found"
      });
    }

    const { buildingName, flatNumber, name } = deletedTenant;

    // Update flat and building
    await Promise.all([
      BuildingModel.findOneAndUpdate(
        { name: buildingName },
        { $inc: { availableBeds: 1 } }
      ),
      FlatDetailsModel.findOneAndUpdate(
        { flatNumber },
        { $pull: { tenants: name }, $inc: { availableBeds: 1 } }
      )
    ]);

    res.status(200).json({
      success: true,
      message: "Successfully deleted tenant"
    });
  } catch (error) {
    console.log("Error in deleting tenant", error);
    res.status(500).json({
      success: false,
      message: "Server error in deleting tenant"
    });
  }
};
 




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

module.exports={addNewTenantDetailsFunction,getTenantsFullDetailsFuncion,
    getTenantsDetaislFunction,bedRequestFormFunction,deleteTenantDetailFunction}