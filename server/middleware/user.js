
// Middleware for handling auth
const{User}=require('../db/index');
const jwt = require("jsonwebtoken");
async function userMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization || "token cuivugd";

        const resp = authorization.split(" ");
        const token = resp[1];
        const response = await jwt.verify(token, process.env.jwtsecreate);
        if (!response.email && response.type == 'user') {
            res.json({
                status: false,
                msg: "invalid session"
            });
        }
        else {
            next();
        }
    }

    catch (error) {
        console.error("usermiddleware error \n" + error);
        res.status(500).json({ error: "Internal server error" });
    }

}
async function getuserid(req) {
    const authorization = req.headers.authorization;
    const resp = authorization.split(" ");
    const token = resp[1];
    const response = await jwt.verify(token, process.env.jwtsecreate);
    return response.id;
}
module.exports = { userMiddleware, getuserid };