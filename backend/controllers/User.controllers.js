import { User } from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async(req,res) => {
    try{

        const {name,email,password,phone} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'Registered successfully' });

    }catch(error){
        console.log(error);
        res.status(500).json({message : "server error register...",error});
    }
}

export const login = async(req,res) => {
      const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
       'jewerly', // 🔐 Use env variable in production
      { expiresIn: '1d' }
    );

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Send token in header as well
    res.header('Authorization', `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const logout = async(req,res) =>{
    res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false // true only in production with HTTPS
  });

  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
}