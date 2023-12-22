import { Task } from "../modles/task.js";


export const newtask = async(req, res, next) => {
    const { title, description } = req.body;

    await Task.create({
        title,
        description,
        user:req.user,
    });
    res.status(201).json({
        success:true,
        message:"task added",
    });
}
export const getmytask = async(req, res, next) => {
    const userid=req.user._id;

    const tasks=await Task.find({user:userid});

    res.status(200).json({
        success:true,
        tasks,
    });
}
export const updatetask = async(req, res, next) => {
    const task=await Task.findById(req.params.id);
    task.iscompleted=!task.iscompleted;
    await task.save();

    res.status(200).json({
        success:true,
        message:"updated",
    });
}
export const deletetask = async(req, res, next) => {
    const task=await Task.findById(req.params.id);
    if(!task) return res.status.json({
        success:false,
        message:"invalid id",
    })
    await task.remove();

    res.status(200).json({
        success:true,
        message:"deleted",
    });
}