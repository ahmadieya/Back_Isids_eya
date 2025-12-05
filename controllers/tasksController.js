const tasksModel = require('../models/tasksSchema');
const userModel = require('../models/userSchema');
const projectModel = require('../models/projectSchema')

module.exports.createTasks = async(req , res ) => {
    try {
      const { Titre , Description  , status , Deadline  ,project } = req.body;

      const projectExist = await projectModel.findById(project);// nthabet l projet mawjoud
    if (!projectExist) return res.status(400).json({ message: "Project Not Found" });
      
      const tasks = await tasksModel.create({// baed namel tache bel param li hatithom fel body
        Titre , Description  , status , Deadline  ,project
      })
      res.status(200).json ({tasks});// n rajaa tache li amaltha
  } catch (error){ res.status(500).json ({message: error.message});
} 

}
module.exports.getAllTasks = async(req , res ) => {
    try {
        
       const tasksList = await tasksModel.find().populate("project").populate("attribue_a");// n3awedh l id projet bel projet objet kima l user zeda
          if (!tasksList){
           throw new error ("task not found");
          }
      
      res.status(200).json ({tasksList});
  } catch (error)
  { res.status(500).json ({message: error.message});
}
}
module.exports.updateTasks= async(req , res ) => {
  try {
     const {id}= req.params//params bech dakhel id khw 
     const {Titre , Description  , status , Deadline  ,project } = req.body; 
      
     const task = await tasksModel.findById(id);
     const taskN = await tasksModel.findByIdAndUpdate(id,{$set : {Titre , Description  , status , Deadline  ,project }}) 
     
    res.status(200).json ({taskN});
} catch (error){ res.status(500).json ({message: error.message});
}

}
module.exports.deleteTask = async(req , res ) => {
    try {
        
        const {id}= req.params// kifkif hachti b id khw 
        const taskByid = await tasksModel.findById(id);// trouver baed supprimer
          if (!taskByid){
            throw new error ("task not found");
          }
      await tasksModel.findByIdAndDelete(id) ;
      res.status(200).json ("deleted");
  } catch (error){ res.status(500).json ({message: error.message});
}

}

module.exports.searchTask = async(req , res ) => {
  try {
      
     const {Titre} = req.query// query khater lezem nhot titre fel recherche
       
      const tasksliste = await tasksModel.find({
       Titre:{$regex:Titre, $options:"i"}// option i  mayhemch ken li hatitou fel recherche majus , minu ect..
      })
      if (!tasksliste){
       throw new error ("Task Not Found ");
       }
    res.status(200).json ({tasksliste});
} catch (error){ res.status(500).json ({message: error.message});
}

}
module.exports.sortTasks= async(req , res ) => {
    try {
      const taskslist = await  tasksModel.find().sort({Titre:1})// tri ascen  
      res.status(200).json ({taskslist});
  } catch (error){ res.status(500).json ({message: error.message});
}

} 

module.exports.affect= async(req , res ) => {
  try {
    
     const { taskId , userId } = req.body; //amalt id lel tache w user
      
     const taskById = await tasksModel.findById(taskId); 

     if(!taskById)
        { throw new Error (" Task Not found")

}
      const userById = await userModel.findById(userId);

     if(!userById)
        { throw new Error (" user Not found")

} // ken tache wel user mawjoudin nzid id user lel tache w id tache lel user 
       await tasksModel.findByIdAndUpdate(taskId,{$set : {attribue_a: userId}})// mamaltch const khater mahachtij yrajaaha fel res200
       await userModel.findByIdAndUpdate(userId,{$set : { task: taskId}})
      
     
    res.status(200).json ('affected');
} catch (error){ res.status(500).json ({message: error.message});
}

}