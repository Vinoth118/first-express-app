const bcrypt = require('bcryptjs');
const saltRounds = 10;

const generateHashValue = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const validateWithHashValue = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports.generateHashValue = generateHashValue;
module.exports.validateWithHashValue = validateWithHashValue;