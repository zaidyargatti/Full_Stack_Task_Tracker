import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

const Create_Project = async (req, res) =>{
    try {
        const {name} = req.body
        const project_count = await Project.countDocuments({
            user:req.user._id
        })
        if(project_count >=4){
            return res.status(400)
            .json({
                message:"You can't create more than 4 projects"
            })
        }
        
        const project = await Project.create({
            name,
            user: req.user._id 
        })
        res.status(201)
        .json({
            project
        })
    } catch (error) {
        res.status(500)
        .json({
             message: 'Failed to create project', 
             error: error.message 
            });
    }
}

const Get_User_Projects = async (req, res) =>{
    try {
        const projects = await Project.find({
            user:req.user._id
        }).sort({createdAt: -1})

        res.status(200)
        .json({
            projects
        })
    } catch (error) {
        res.status(500)
        .json({
             message: 'Failed to get projects', 
             error: error.message 
            });
        }
    }
   
const Delete_Project = async (req, res) => {
    try {
      const projectId = req.params.id;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      await Task.deleteMany({ projectId });
      await Project.findByIdAndDelete(projectId);
  
      res.status(200).json({ message: "Project and related tasks deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting project", error: error.message });
    }
  };

const Get_Single_Project = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json({ project });
    } catch (error) {
      res.status(500).json({ message: "Error fetching project", error: error.message });
    }
  };

export {
    Create_Project,
    Get_User_Projects,
    Delete_Project,
    Get_Single_Project
}