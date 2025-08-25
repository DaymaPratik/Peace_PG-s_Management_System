const express=require('express');
const cors=require("cors");
const AdminRouter=require('./Router/AdminRouter');
const BuildingRouter=require("./Router/BuildingRouter")
const TenantRouter=require("./Router/TenantRouter")
const ContactUsRouter=require("./Router/ContactUsRouter")
const UserRouter=require("./Router/UserRouter")
const FlatsRouter=require("./Router/FlatsRouter")
const ComplainsRouter=require('./Router/ComplainsRouter')
const { default: mongoose } = require('mongoose');
const BedRequestRouter=require("./Router/BedRequestRouter")
const TestimonialsRouter=require('./Router/TestimonialsRouter')

const app=express();
app.use(express.json());
app.use(cors({
    origin:"https://prohirex.provaantech.com/",
    credentials:true,
    method:"GET POST"
}))
app.use(UserRouter)
app.use(FlatsRouter)
app.use(ContactUsRouter);
app.use(AdminRouter);
app.use(BuildingRouter);
app.use(TenantRouter);
app.use(ComplainsRouter)
app.use(BedRequestRouter);
app.use(TestimonialsRouter);

app.listen(8000,()=>{
    console.log("App is listening at 8000 post")
})
mongoose.connect("mongodb://localhost:27017/Peace_PG_DATABASE")
.then(()=>console.log("Data base connected cluster"))
.catch((error)=>console.log("Error connecting database",error))




// VERCEL FRONTEND URL :"https://peace-pg-s-management-system.vercel.app/"
// LOCALHOST FRONTEND UrL:"http://localhost:5173"
// RNEDER BACKEND URL:"https://peace-pg-s-management-system.onrender.com"
// LOCALHOST BACKENDURL:"https://peace-pg-s-management-system.onrender.com"
// MONGODB LOCAL HOST URL:"mongodb://localhost:27017/Peace_PG_DATABASE"
// MONGODB CLUSTER ONLINE URL:"mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Peace_PG_DATABAS















// Thanks for sharing the full code and models — that helps a lot. You’re on the right track, but there are some logical and architectural issues that are making the system inconsistent. Let’s address this step-by-step and then I’ll show you how to **optimize** and **fix** it cleanly.

// ---

// ### ✅ PRIMARY ISSUES & SOLUTIONS

// ---

// #### 1. **Flat is full but still accepting tenants**

// **Problem:**
// You're creating the `Tenant` first **before checking if the flat is full**. Then you decrement beds in both building and flat, and finally check if the flat is full — but by then, you’ve already added the tenant!

// **Solution:**
// **Check availability before creating the tenant**. Rearrange your logic:

// * First, check if the flat exists and has available beds.
// * Then create the tenant and update building/flat models accordingly.

// ---

// #### 2. **Redundant and conflicting bed decrementing**

// You’re decreasing available beds in both:

// ```js
// await BuildingModel.findOneAndUpdate(...)
// await FlatDetailsModel.findOneAndUpdate(...)
// ```

// And then again:

// ```js
// await FlatDetailsModel.findOneAndUpdate(... { $inc: { availableBeds: -1 } })
// ```

// **Fix:**
// Only decrement once. Do all validations before updating.

// ---

// #### 3. **When deleting a tenant, flat doesn't get updated**

// That’s because the delete route isn't updating the corresponding `FlatDetailsModel`:

// * You need to `$pull` the tenant name from `tenants` array
// * `$inc` the available beds by 1

// ---

// ### ✅ OPTIMIZED & CORRECT APPROACH

// ---

// ### 🔄 Step-by-Step Workflow (Add Tenant)

// ```js
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
// ```

// ---

// ### 🔄 Step-by-Step Workflow (Delete Tenant)

// ```js
// const deleteTenant = async (req, res) => {
//   const { tenantId } = req.params;

//   try {
//     const tenant = await TenantModel.findByIdAndDelete(tenantId);

//     if (!tenant) {
//       return res.status(404).json({ success: false, message: "Tenant not found" });
//     }

//     // Update Flat and Building
//     await FlatDetailsModel.findOneAndUpdate(
//       { flatNumber: tenant.flatNumber },
//       {
//         $pull: { tenants: tenant.name },
//         $inc: { availableBeds: 1 }
//       }
//     );

//     await BuildingModel.findOneAndUpdate(
//       { name: tenant.buildingName },
//       { $inc: { availableBeds: 1 } }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Tenant deleted and flat updated"
//     });
//   } catch (err) {
//     console.error("Error deleting tenant", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while deleting tenant"
//     });
//   }
// };
// ```

// ---

// ### ✅ Optional Improvements

// 1. **Add `tenantCount` or `tenantRefs` instead of just `tenant names` in `FlatDetailsModel`**.
// 2. **Use transaction/session** if you want atomic operations (`create tenant + update flat`).
// 3. **Index `email`, `bedNo`**, and `flatNumber` for faster lookup.
// 4. Add a **global `capacity check function`** for reuse.

// ---

// ### ✅ Summary

// | Fix                                                | Why It's Needed                         |
// | -------------------------------------------------- | --------------------------------------- |
// | Check flat availability **before** creating tenant | Avoid invalid state                     |
// | Only decrement beds once                           | Prevent inconsistency                   |
// | Update flat on tenant delete                       | Keep tenant list + availability correct |
// | Use `$push` and `$pull` properly                   | Maintain array structure                |
// | Validate all inputs before DB writes               | Prevent bad data                        |

// ---

// Let me know if you'd like me to help you:

// * Write the full optimized tenant controller
// * Convert these into services
// * Implement session/transaction logic with Mongoose

// Would you like that?
