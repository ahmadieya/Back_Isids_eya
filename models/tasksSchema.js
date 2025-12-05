const mongoose = require('mongoose');
const tasksSchema = new mongoose.Schema({



    Titre: { type: String, required: true },
    Description: { type: String },
    status: { type: String, enum: ['en cours', 'terminé', 'en pause'] },
    Deadline: { type: Date },
    createdAt: { type: Date, default: Date.now },


    project: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true },//tache fi projet wehed  w projet fih barcha tachet yani many to one
    attribue_a: { type: mongoose.Schema.Types.ObjectId, ref: "user" }// tache yamelha user wehed one to one

   
   

},
    { timestamps: true }//bch tatini lwa9t 

); 


       
    

const tasks = mongoose.model("tasks", tasksSchema);
module.exports= tasks;