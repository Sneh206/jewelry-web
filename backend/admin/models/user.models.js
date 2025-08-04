import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        min : 3,
    },
    phone : {
        type : Number,
        required : true
    },
    // resetPasswordToken : String,
    // resetPasswordExpires: Date,
});

export const AdminUser = mongoose.model('UserAdmin',userschema);
