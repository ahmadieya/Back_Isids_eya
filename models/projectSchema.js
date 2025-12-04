const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({

    Nom: { type: String, required: true },
    Description: { type: String},
    status: { type: String, enum: ['en cours', 'terminé', 'en pause'] },
    createdAt: { type: Date, default: Date.now },
    Owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }// one to one

},
    { timestamps: true }

);


       
    

const project = mongoose.model("project", projectSchema);
module.exports= project;