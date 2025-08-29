const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require('../helpers/response');

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return response.error(res, 'Email already registered', 400);
            }
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
            if (!user) return response.error(res, "Invalid email or password", 404);

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return response.error(res, "Invalid email or password", 401);

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

    static async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return response.error(res, "No token provided", 401);

            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) return response.error(res, "Invalid token", 401);
                response.success(res, "Logout successful");
            });
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }
}

module.exports = AuthController;
