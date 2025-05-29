const mongoose=require('mongoose')
const FlatsSchema=new mongoose.Schema({
  flatNumber:{
    type:String,
    required:true
  },
  floorNo:{
    type:String,
    required:true
  },
  beds:{
    type:String,
},
  tenants:{
    type:Array,
    
  },

  flatType:{
    type:String,
    
  },
  name:{
    type:String,
    
  },
  avialableBeds:{
    type:String,
  }
})
const FlatDetailsModel=mongoose.model('Flat_Details', FlatsSchema)
module.exports=FlatDetailsModel;

