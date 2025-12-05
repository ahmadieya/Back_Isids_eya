const userModel = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maxTime= 1 *60 *60

const createToken = (id) =>{
  return jwt.sign({id},'net secret ds',{expiresIn: maxTime})//fct tasna3li token   1m 9adeh w yetnaha token selon date dexpiration
};//yekhou token w net secret w ykharej fct ye err ye decodedtoken ye mafamech token

module.exports.addManger = async (req, res  ) => {
    try {
        const { Nom, Login , Password } = req.body;
 

        const salt = await bcrypt.genSalt(10);//amalet salt parametre lel hachage
        const hashedPassword = await bcrypt.hash(Password, salt)

        const roleManager = 'Manager';//fixit l role 
        const user = await userModel.create({
            Nom, Login, Password:hashedPassword, role: roleManager
        });
        res.status(200).json({ message: "utilisateur crée:", user });
    } catch (error) {
         console.error(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports.register = async (req, res) => {
  try {
    const { Nom , Login, Password } = req.body;
    const user = await userModel.register(  Nom , Login, Password);
    const token = createToken(user._id);  // ki yamel inscri tetsna3 token
     res.cookie("jwt_token", token, { 
      httpOnly: false,
      maxAge: maxTime * 1000 //youfa lwa9et tetfasakh token
    });

    res.status(200).json({ message: "utilisateur crée:", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports.login = async(req,res)=>{ //lena yetsna3 token w yetsajel fel cookies
  try{
    const { Login , Password } = req.body;
    const user = await userModel.login(Login , Password )
    const token= createToken(user._id)
    res.cookie("jwt_token",token , {httpOnly:false , maxAge:maxTime*1000})//ychoouf login deja msajel wela le  baed lwa9et tetfasakh cookie
    res.status(200).json (user);
  }catch(error){  res.status(500).json({message: error.message})}
};

module.exports.getAllUsers = async(req , res ) => {
    try {
      const userliste = await userModel.find()
      res.status(200).json ({userliste});
  } catch (error){ res.status(500).json ({message: error.message});
}}
