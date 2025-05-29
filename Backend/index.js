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

const app=express();
app.use(express.json());
app.use(cors({
    origin:"https://peace-pg-s-management-system.vercel.app",
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


app.listen(8000,()=>{
    console.log("App is listening at 8000 post")
})
mongoose.connect("mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Peace_PG_DATABAS")
.then(()=>console.log("Data base connected cluster"))
.catch((error)=>console.log("Error connecting database",error))




// VERCEL FRONTEND URL :"https://peace-pg-s-management-system.vercel.app/"
// LOCALHOST FRONTEND UrL:"http://localhost:5173"
// RNEDER BACKEND URL:"https://peace-pg-s-management-system.onrender.com"
// LOCALHOST BACKENDURL:"https://peace-pg-s-management-system.onrender.com"
// MONGODB LOCAL HOST URL:"mongodb://localhost:27017/Peace_PG_DATABASE"
// MONGODB CLUSTER ONLINE URL:"mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Peace_PG_DATABAS

