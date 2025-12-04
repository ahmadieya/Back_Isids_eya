const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = (req, res, next) => {
    const token = req.cookies.jwt_token;
    console.log("token", token);

    if (token) {
        jwt.verify(token, 'net secret ds', async (err, decodedToken) => {
            if (err) {
                console.log("erreur au niveau de token", err.message);
                //req.session.user = null;//err fi token donsc user mandich

                res.json("/Problem_Token");
            } else {
                //req.session.user = await userModel.findById(decodedToken.id);//ki yabda andi yatini user authentifier
                next();
            }
        });
    } else {
        //req.session.user = null;
        res.json("/pas_de_token")
    }
};
module.exports = { requireAuthUser };