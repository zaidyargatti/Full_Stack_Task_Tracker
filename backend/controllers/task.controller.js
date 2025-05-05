import Task from "../models/task.model.js";

const Create_Task = async (req, res) =>{
    try {
        const {title,description ,projectId}=req.body
        
        const task= await Task.create({
            title,
            description,
            project: projectId,
            user: req.user._id
        })

        res.status(200)
        .json({
            task
        })
    } catch (error) {
        res.status(500).
        json({
             message: 'Failed to create task',
              error: error.message 
            })
    }
}

const Get_Task_By_Project= async (req, res) =>{
    try {
        const{projectId}=req.params

        const tasks = await Task.find({
             project: projectId,
              user: req.user._id 
            }).sort({ createdAt: -1 })
            res.status(200)
            .json({
                tasks
            })
    } catch (error) {
        res.status(500).
        json({
             message: 'Failed to get task',
              error: error.message 
            })
    }
}

const Delete_Task = async (req, res) =>{
    try {
        const { id } = req.params
        const task = await Task.findOneAndDelete({
             _id: id,
              user: req.user._id 
            })
            if (!task) {
                return res.status(404)
                .json({
                     message: 'Task not found or unauthorized'
                     })
              }
              res.status(200)
              .json({
                 message: 'Task deleted' 
                })

    } catch (error) {
        res.status(500).
        json({
             message: 'Failed to delete task',
              error: error.message 
            })
    }
}

const Toggle_Task = async (req, res) =>{
    try {
        const {id}=req.params
        const task = await Task.findOne({
            _id:id,
            user:req.user._id
        })
        if(!task){
            return res.status(404)
            .json({ message: 'Task not found' })
        }
        if (task.status === 'Done') {
            task.status = 'Todo'
            task.completedAt = null
        } else if(task.status === 'In Progress'){
            task.status = 'In Progress'
            task.completedAt = null  
          } else if(task.status === 'Done') {
             task.status = 'Done'
             task.completedAt = new Date();
          }
          res.status(200)
          .json({
            task
        });
    } catch (error) {
        res.status(500).
        json({
             message: 'Failed to update task status',
              error: error.message 
            })
    }

}

export {
    Create_Task,
    Get_Task_By_Project,
    Delete_Task,
    Toggle_Task
}