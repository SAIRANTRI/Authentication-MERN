import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password,10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); 
    const user = new User({
      email,
      password: hashedPassword,
      username, 
      verificationToken,
      verificationTokenExpiresAt: Date.now() + + 24 * 60 * 60 * 1000, //24hours
    })

    await user.save();
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try{
    const user = await User.findOne({verificationToken: code, 
      verificationTokenExpiresAt: {$gt: Date.now()}});

      if(!user){  
        return res.status(400).json({
          success: false, message: "Invalid OR expired verification code"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.username);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    })

  }catch(error){
    console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  res.send("login");
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
