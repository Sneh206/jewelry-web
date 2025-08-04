import generateToken from "../../utils/generateToken.js";
import { AdminUser} from "../models/user.models.js";
import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";

export const adminregister = async(req,res) => {
    try{

        const {name,email,password} = req.body
        const {phone} = req.body

        if(!name || !email || !password || !phone){
            res.status(400).json({message : "all data register ..."});
        }

        const user = await  AdminUser.findOne({email});

        if(user){
            res.status(400).json({message : "email alred register..."});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await AdminUser.create({
            name,
            email,
            password : passwordHash,
            phone,
        })

        res.status(200).json({message : "User register...",newUser});

    }catch(error){
        console.error(error);
        res.status(500).json({message : "server error adminregister : ",error});
    }
}

export const adminLogin = async(req,res) => {
    try{
        const {email,password} = req.body;

        if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await AdminUser.findOne({email});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordcompare = await bcrypt.compare(password, user.password);

     if (!passwordcompare) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const Token = generateToken(user._id,res);

    res.status(200).json({message : "login data successfully : ",user,passwordcompare,Token});

    }catch(error){
        console.error(error);
        res.status(500).json({message : "server error login...",error});
    }
}

export const adminLogout = async(req,res) => {
    try{

         res.cookie("token","",{maxAge : 0});

         res.status(200).json({message : "user logout successfully"})

    }catch(error){
        res.status(500).json({message : "server error logout...",error});
    }
}

export const adminDelete = async(req,res) => {
    try{
        const adminId = req.user._id;

        const deletedAdmin = await AdminUser.findByIdAndDelete(adminId);

        if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin account not found" });
    }

    res.clearCookie("token");

         res.status(200).json({message : "user adminDelete successfully"})

    }catch(error){
        res.status(500).json({message : "server error adminDelete...",error});
    }
}

export const adminall = async(req,res) =>{
    try{
        const users = await AdminUser.find();
    res.status(200).json(users);
    }catch(error){
        res.status(500).json({message : "server error adminall...",error});
    }
}

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { currentPassword, newPassword } = req.body;

    const user = await AdminUser.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const me = async (req, res) => {
  const admin = await Admin.findById(req.adminId).select('-password');
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json({ admin });
};