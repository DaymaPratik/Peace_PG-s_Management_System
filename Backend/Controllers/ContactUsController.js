const ContactUsFromModel=require("../Model/ContactUsModel");
const addContactFromDetailsFunction=async(req,res)=>{
    console.log(req.body);
   try {
    const contactUsFormDetail=await ContactUsFromModel.create(req.body);
    res.status(200).json({
        success:true,
        message:"Added contact form details",
        contactUsFormDetail:contactUsFormDetail
    })
   } catch (error) {
    console.log("Error backend while submiting contact us form in backend",error);
    res.status(400).json({
        success:false,
        message:"Error backend while submiting contact us form in backend"
    })
   }
}
const getContactFormDetailsFunction=async(req,res)=>{
    try {
        const contactUsFormDetailsArray=await ContactUsFromModel.find({});
        res.status(200).json({
            success:true,
            message:"got all contact form details",
            contactUsFormDetailsArray:contactUsFormDetailsArray
        })
    } catch (error) {
    console.log("Error backend while getting contact us form details in backend",error);
    res.status(400).json({
        success:false,
        message:"Error backend while getting contact us form details in backend"
    })
    }
}

const deleteContactUsFormDetailFunction=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedContactForm=await ContactUsFromModel.deleteOne({_id:id});
        console.log(deletedContactForm);
        res.status(200).json({
            success:true,
            message:"successfully deleted contact form",
        })
    } catch (error) {
        console.log("Error in deleting contact form ,backend",error);
        res.status(400).json({
            success:false,
            message:"Error in deleting contact form ,backend"
        })
    }
}
module.exports={addContactFromDetailsFunction,getContactFormDetailsFunction,deleteContactUsFormDetailFunction}