const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    Nom: { type: String, required: true },
    Login: { type: String, required: true , unique: true, match:[/^\S+@\S+\.\S+$/ , "Vérifier votre email"]},//login amaltou email
    Password: {
        type: String, required: true, minLength: 8, match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "le mot de passe doit contenir au moins 8 caractéres, une lettre majuscule , une lettre minuscule et un chiffre"

        ]
    },
    role: { type: String, enum: ["User", "Manager"] },
    createdAt: { type: Date, default: Date.now },
    Project: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },//user andou projet wehed 
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }//user andou tache wahda 

},
    { timestamps: true }

);
userSchema.statics.login= async function (Login,Password) {
 
           const user=await this.findOne({Login});
           if (user) {
            const auth = await bcrypt.compare( Password,user.Password);// trajaa true wela false bin l mot de passe li hatitou tawa weli amel bih lcompte
            if (auth){
                return user;
            }else {
                throw new Error ("Mot de passe invalide");

            }
           }else {
            throw new Error ("Vérifier votre email") // si l mot de passe shih donc l'email ghalet
           }
    
        };

     // hatit mode async w await nhotha feli bch tameli retard 
      userSchema.statics.register = async function (Nom , Login, Password ) {
 
  const existUser = await this.findOne({ Login });
  if (existUser) {
    throw new Error("Ce login existe déjà."); //bch yamel inscri lezem mandouch ccmpte
  }

  const salt = await bcrypt.genSalt();//salt parametre bch namel biha l'hachage
  const hashedPassword = await bcrypt.hash(Password, salt);//securite estamelt hachage khater sens unique famech dehachage
  const roleUser = 'User';
 
  const user = await this.create({Nom,Login, Password: hashedPassword,role: roleUser
  });

  return user;
};

const user = mongoose.model("user", userSchema);
module.exports= user;