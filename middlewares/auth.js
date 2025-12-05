//middelwares fct intermidiaire verifier le token  est ce que luser andou lha9 bch yamel lapi/route heka wela le
// ki namel login yasna3 token tetsajel fel cokkies ki namel logout to9tel wela tfasakh cokkies

const jwt = require("jsonwebtoken");//pour creer token
const userModel = require("../models/userSchema");


module.exports.requireAuthUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;

        if (!token) {
            return res.status(400).json({ message: "Token manquant" }); // err f token yani famech login
        }
        const decoded = jwt.verify(token, "net secret ds");
        const user = await userModel.findById(decoded.id); //ki yabda andi yatini user authentifier
        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable" });// famech user 
        }
        req.user = user;

        next();
    } catch (error) {
        console.log("Erreur Auth :", error.message);
        return res.status(400).json({ message: "Token invalide" });
    }
};
module.exports.requireManager = async (req, res, next) => {
  await module.exports.requireAuth(req, res, async () => {
    if (req.user.role !== "manager") {// ken role mouch manager manodkhelch lel route
      return res.status(400).json({ message: "Accès refusé : manager uniquement" });
    }
    next();
  });
};

