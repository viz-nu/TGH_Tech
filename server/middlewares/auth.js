import jwt from "jsonwebtoken";
import config from "config";
let { JWT } = config.get("SECRET_KEYS")
async function authMiddleware(req, res, next) {
    try {

        let decoded = jwt.verify(req.headers["token"], JWT);
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error at auth middleware (token invalid)");
        return res.status(401).json({ message: 'Unauthorised or Token Expired' });
    }
}

export default authMiddleware;