const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require('../helpers/response');

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hash, role });
            response.success(res, 'User registered successfully', user);
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) return response.error(res, "User not found", 404);

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return response.error(res, "Invalid password", 401);

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES }
            );

            response.success(res, 'Login successful', { token });
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }
}

module.exports = AuthController;
