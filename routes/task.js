import express from "express";
import { deletetask, getmytask, newtask, updatetask } from "../controllers/task.js";
import { isauthenticated } from "../middleware/auth.js";
const router=express.Router();

router.post("/new",isauthenticated,newtask);
router.get("/all",isauthenticated,getmytask);
router.route("/:id").put(isauthenticated,updatetask).delete(isauthenticated,deletetask);


export default router; 