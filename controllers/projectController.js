const projectModel = require('../models/projectSchema');
const userModel = require('../models/userSchema');

module.exports.createProject = async(req , res ) => {
    try {
      const { Nom , Description  , status } = req.body;
      
      const project = await projectModel.create({
       Nom , Description  , status ,owner: req.user._id
      })
      res.status(200).json ({project});
  } catch (error){ res.status(500).json ({message: error.message});
}

}

module.exports.getAllProjects = async(req , res ) => {
    try {
        
       const projectList = await projectModel.find();
          if (!projectList){
           throw new error ("project not found");
          }
      
      res.status(200).json (projectList);
  } catch (error)
  { res.status(500).json ({message: error.message});
}

}

module.exports.deleteProjectById = async(req , res ) => {
    try {
        
        const {id}= req.params
        const projectByid = await projectModel.findById(id);
          if (!projectByid){
            throw new error ("project not found");
          }
      await projecttModel.findByIdAndDelete(id) ;
      res.status(200).json ("deleted");
  } catch (error){ res.status(500).json ({message: error.message});
}

}
module.exports.updateProject= async(req , res ) => {
  try {
     const {id}= req.params
     const {Nom , Description  , status } = req.body; 
      
     const project = await projecttModel.findById(id);
     const projecttN = await projecttModel.findByIdAndUpdate(id,{$set : {Nom , Description  , status }}) 
     
    res.status(200).json ({projecttN});
} catch (error){ res.status(500).json ({message: error.message});
}

}



