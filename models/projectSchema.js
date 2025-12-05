const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({

    Nom: { type: String, required: true },
    Description: { type: String},
    status: { type: String, enum: ['en cours', 'terminé', 'en pause'] },
    createdAt: { type: Date, default: Date.now },
    Owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },// one to one projet yamlou seul user
    tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }//one to many  projet fih barcha tachet
},
    { timestamps: true }

); 


       
    

const project = mongoose.model("project", projectSchema);
module.exports= project;