import mongoose from "mongoose";

function isEmail(v){
 let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if(v.match(regex)){
    return true
 }else{
    return false
 }
}
function isNumber(n){
    let regex = /^\+?[0-9]\d{1,20}$/;
    if(n && n.match(regex)){
        return true
    }else{
        return false
    }
}


let userSchema = new mongoose.Schema({
firstname:String,
lastname:String,
phonenumber:{
    type:Number,
    validate:[isNumber,"validate number"]
},
email: {
    type:String,
    unique : true,
    lowecase:true,
    validate:[isEmail,"validate email"]
},
username:{
    type: String,
    unique:true,
    lowecase:true,
    required: true
},
password:{
    type:String,
    required:true,
}
})


export default userSchema;