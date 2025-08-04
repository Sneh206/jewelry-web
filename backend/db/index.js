import mongoose from "mongoose";

const ConnectDB = async(req,res) => {
    try{

        await mongoose.connect(process.env.MONGOOSE_URI,{
            dbName : "jewerly",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Mongoose connect succesfully');

    }catch(error){
        console.error(error);
        console.log('server error mongoose',error);
    }
}

export default ConnectDB;