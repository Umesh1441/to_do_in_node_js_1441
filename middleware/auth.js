import  {User}  from "../modles/user.js";
import jwt from "jsonwebtoken";

export const isauthenticated = async (req, res, next) => {
    // console.log("token");
    const { token } = req.cookies;
    if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First",
        });

    const deccoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(deccoded._id);
    next();
}