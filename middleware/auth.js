const jwt = require("jsonwebtoken");
const response = require("../helpers/response");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return response.error(res, "No token provided", 401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return response.error(res, "Invalid token", 401);
    }
};
