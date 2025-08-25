
const response = require("../helpers/response");
module.exports = (roles = []) => {
    if (typeof roles === "string") roles = [roles];

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return response.error(res, "Forbidden", 403);
        }
        next();
    };
};
