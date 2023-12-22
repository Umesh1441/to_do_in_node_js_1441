import { User } from "../modles/user.js";
import bcrypt from "bcrypt";
import { sendcookies } from "../utils/features.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }
    sendcookies(user, res, `Welcome back : ${user.name}`, 200);
}
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exist",
        });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashpassword });
    sendcookies(user, res, "registered Succesfully..", 201);
}
export const getmyprofile=(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    });
}
export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
        secure:process.env.NODE_ENV==="Development" ? false :true,
    })
        .json({
        success:true,
        user:req.user,
    });
}