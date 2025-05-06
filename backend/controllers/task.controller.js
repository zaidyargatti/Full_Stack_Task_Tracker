import Task from "../models/task.model.js";

const Create_Task = async (req, res) =>{
    try {
        const {title,description ,projectId,dueDate}=req.body
        
        const task= await Task.create({
            title,
            description,
            project: projectId,
            user: req.user._id,
            dueDate: new Date()
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

const Toggle_Task = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const task = await Task.findOne({
        _id: id,
        user: req.user._id,
      });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Set the new status directly
      task.status = status;
  
      // Optionally handle completedAt based on status
      if (status === 'Done') {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
  
      await task.save();
  
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update task status',
        error: error.message,
      });
    }
  };
  
  const Update_Task = async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description, dueDate } = req.body;
  
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id, user: req.user._id }, 
        { title, description, dueDate },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found or unauthorized' });
      }
  
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      console.error('Update Task Error:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };


export {
    Create_Task,
    Get_Task_By_Project,
    Delete_Task,
    Toggle_Task,
    Update_Task
}