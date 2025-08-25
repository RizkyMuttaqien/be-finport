module.exports = {
    success: (res, message, data = null, code = 200) => {
        return res.status(code).json({ error: false, message, data });
    },
    error: (res, message, code = 500, data = null) => {
        return res.status(code).json({ error: true, message, data });
    }
};
