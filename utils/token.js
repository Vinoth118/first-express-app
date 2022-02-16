const jwt = require('jsonwebtoken');

const generateToken = async (email) => {
    const token = jwt.sign(
        { email },
        process.env.JWT_KEY,
        { expiresIn: "1hour" }
    );

    return token;
}

const validateToken = async (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        return data;
    } catch (error) {
        return false;
    }
}

module.exports.generateToken = generateToken;
module.exports.validateToken = validateToken;