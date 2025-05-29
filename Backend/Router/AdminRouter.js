const express=require('express');
const router=express.Router();
const{adminLoginFunction,adminRegisterFunction,addNewGaurdFunction,getAllRaiseComplaintsFunction,
    addNewStaffDetailsFunction,deleteGaurdFunction,getStaffDetailsFunction,deleteNewStaffDetailsFunction,getGaurdDetailsFunction
}=require('../Controllers/AdminController')
router.post('/api/adminLogin',adminLoginFunction);
router.post('/api/adminRegister',adminRegisterFunction);
router.post('/api/admin/add/gaurd/details',addNewGaurdFunction);
router.post('/api/admin/add/newHousingStaff/details',addNewStaffDetailsFunction)
router.delete('/api/admin/delete/guard/details/:id',deleteGaurdFunction);
router.delete('/api/admin/delete/newHousingStaff/details/:id',deleteNewStaffDetailsFunction)
router.get('/api/admin/get/gaurdDetails',getGaurdDetailsFunction);
router.get('/api/admin/get/staffDetails',getStaffDetailsFunction)
router.get('/api/admin/getMyRaisedComplain',getAllRaiseComplaintsFunction)
module.exports=router;