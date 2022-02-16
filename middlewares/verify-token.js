const { validateToken } = require('../utils/token');

async function verifyToken (req, res, next) {
    try {
       const { token } = req.cookies;
       const valid = await validateToken(token);
       if(!valid) {
           res.status(401).json({
               success: false,
               message: "Please login to access this route"
           })
       } else {
           next();
       }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
}

module.exports = verifyToken;