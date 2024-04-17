const jwt = require('jsonwebtoken');
module.exports = (membres) => {
    const payload = {
        pseudo: membres.prenom,
        email: membres.email,
        role: membres.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
}