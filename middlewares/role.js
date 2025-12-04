
const role  = (req, res, next) => {
    //if (!req.user)
        // return res.status(401).json({ message: "Vous n'avez pas de compte" });
    if (req.user.role !== 'Manager') 
        return res.status(403).json({ message: 'Accès réservé au manager' });
    next();
};
module.exports = { role };