const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({

    Nom: String,
    Login: String,
    Mot_de_passe: {
        type: String, required: true, minLength: 8, match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "le mot de passe doit contenir au moins 8 caractéres, une lettre majuscule , une lettre minuscule , un chiffre"

        ]
    },
    role: { type: String, enum: ["User", "Manager"] },

},
    { timestamps: true }

);
userSchema.pre("save", async function( next){//.pre 9bal me save data
    try{                                     // salt parametre namel biha hachage
        const salt = await bcrypt.genSalt();// hatit mode async ala khater hedhi bch taatelni hatitlha awail
        const user = this ;                  //securite estamelt hachage sens unique w jwt 
        user.password = await bcrypt.hash(user.password , salt)
     next();
    }catch(error){
     next(error);
    }
})
userSchema.post("save" , async function (req , res , next) { //.post baed ma tsave data
    console.log("nouveau utilisateur a été ajouté avec succès");
    next();//taada li baadou lezem n9olou bch ye9fch 
})

const user = mongoose.model("user", userSchema);
module.exports= user;