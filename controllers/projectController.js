const projectModel = require('../models/projectSchema');
const userModel = require('../models/userSchema');

module.exports.createProject = async(req , res ) => {// namel exportation mel awel l fct 
    try {
      const { Nom , Description  , status } = req.body;
      
      const project = await projectModel.create({
       Nom , Description  , status ,owner: req.user.id
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
      
      res.status(200).json ({projectList});
  } catch (error)
  { res.status(500).json ({message: error.message});
}

}

module.exports.updateProject= async(req , res ) => {
  try {
     const {id}= req.params
     const {Nom , Description  , status } = req.body; 
      
     const project = await projectModel.findById(id);
     const projectN = await projectModel.findByIdAndUpdate(id,{$set : {Nom , Description  , status }}) 
     
    res.status(200).json ({projectN});
} catch (error){ res.status(500).json ({message: error.message});
}

}

module.exports.deleteProjectById = async(req , res ) => {
    try {
        
        const {id}= req.params
        const projectByid = await projectModel.findById(id);
          if (!projectByid){
            throw new error ("project not found");
          }
      await projectModel.findByIdAndDelete(id) ;
      res.status(200).json ("deleted");
  } catch (error){ res.status(500).json ({message: error.message});
}

}


module.exports.searchProjectByName = async(req , res ) => {
  try {
      
     const {Nom} = req.query
       
      const projectliste = await projectModel.find({
       Nom:{$regex: Nom, $options:"i"}
      })
      if (!projectliste){
       throw new error ("Project Not Found ");
       }
    res.status(200).json ({projectliste});
} catch (error){ res.status(500).json ({message: error.message});
}

}

module.exports.sortProject = async(req , res ) => {
    try {
      const projectliste = await  projectModel.find().sort({Nom:1})
      res.status(200).json ({projectliste});
  } catch (error){ res.status(500).json ({message: error.message});
}

} 

// nafs les commentaires mta tasks khater nafs l crud presque

