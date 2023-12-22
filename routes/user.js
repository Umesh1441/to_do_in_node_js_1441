import express from "express";
import { register,login,getmyprofile,logout} from "../controllers/user.js";
import { isauthenticated } from "../middleware/auth.js";
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",isauthenticated,getmyprofile);
router.post("/logout",logout);
export default router;