const express=require("express");
const {addNewTenantDetailsFunction,getTenantsFullDetailsFuncion,bedRequestFormFunction,
    getTenantsDetaislFunction,deleteTenantDetailFunction}=require("../Controllers/TenantController")
const router=express.Router();
router.post("/api/addNewTenantDetails",addNewTenantDetailsFunction);
router.get("/api/getTenantsDetails",getTenantsDetaislFunction)
router.delete("/api/post/tenants/deleteTenantDetails/:id",deleteTenantDetailFunction)
router.get("/api/tenant/getFullDetails/:email",getTenantsFullDetailsFuncion)
router.post("/api/tenant/bedRequestForm",bedRequestFormFunction)
module.exports=router;








// const deleteTenantDetailFunction=async(req,res)=>{
//     try {
//         const {id}=req.params;
//         const deletedTenant=await TenantModel.findByIdAndDelete({_id:id});
//         console.log(deletedTenant);
//         const buildingNameOfTenant=deletedTenant.buildingName
//         const flatNo=deletedTenant.flatNumber
//         console.log(deletedTenant.buildingName,"    ",deletedTenant.flatNumber);
//        await BuildingModel.findOneAndUpdate(
//         {name:buildingNameOfTenant},
//          {$inc:{ availableBeds:1}},
//          {new:true}
//         );
       
       
//         await FlatDetailsModel.findOneAndUpdate(
//         {flatNumber:flatNo},
//          {$pull: { tenants: tenant.name },  $inc: { availableBeds: 1 }},
//          {new:true}
//         );



//         res.status(200).json({
//             success:true,
//             message:"successfully deleted tenat details",
//         })
         
//     } catch (error) {
//         console.log("Error in deleting tenant ,backend",error);
//         res.status(400).json({
//             success:false,
//             message:"Error in deleting tenant ,backend"
//         })
//     }
// }








// const addNewTenantDetailsFunction = async (req, res) => {
//   const {
//     name,
//     email,
//     bedNo,
//     flatNumber,
//     buildingName,
//     floor,
//     flatType,
//     ...rest
//   } = req.body;

//   try {
//     // 1. Check if email or bed is already taken
//     const [emailExists, bedExists] = await Promise.all([
//       TenantModel.findOne({ email }),
//       TenantModel.findOne({ bedNo })
//     ]);

//     if (emailExists)
//       return res.status(400).json({ success: false, message: "Email of Tenant already exists" });

//     if (bedExists)
//       return res.status(400).json({ success: false, message: "Bed of Tenant already booked" });

//     // 2. Check flat availability
//     let flat = await FlatDetailsModel.findOne({ flatNumber });

//     if (flat) {
//       if (flat.availableBeds === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Flat is full, please create a new flat"
//         });
//       }
//     } else {
//       // 3. Flat doesn't exist, calculate bedsPerFlat
//       const building = await BuildingModel.findOne({ name: buildingName });
//       if (!building) {
//         return res.status(400).json({ success: false, message: "Building not found" });
//       }

//       const bedsPerFlat = building.bedsPerFloor / building.flatsPerFloor;

//       flat = await FlatDetailsModel.create({
//         flatNumber,
//         floorNo: floor,
//         beds: bedsPerFlat,
//         availableBeds: bedsPerFlat - 1,
//         tenants: [name],
//         flatType,
//         name: buildingName
//       });

//       // Decrement building bed count
//       await BuildingModel.findOneAndUpdate(
//         { name: buildingName },
//         { $inc: { availableBeds: -1 } }
//       );
//     }

//     // 4. Create tenant only after flat check
//     const newTenantDetails = await TenantModel.create(req.body);

//     // 5. If flat already exists, update it
//     if (flat) {
//       await FlatDetailsModel.findOneAndUpdate(
//         { flatNumber },
//         {
//           $push: { tenants: name },
//           $inc: { availableBeds: -1 }
//         }
//       );

//       await BuildingModel.findOneAndUpdate(
//         { name: buildingName },
//         { $inc: { availableBeds: -1 } }
//       );
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Tenant added successfully",
//       newTenantDetails
//     });
//   } catch (err) {
//     console.error("Error adding tenant", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while adding tenant"
//     });
//   }
// };