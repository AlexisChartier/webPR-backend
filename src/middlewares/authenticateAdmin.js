const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, membres) => {
        if (err) return res.sendStatus(403);
        if (membres.role !== 2) return res.sendStatus(403);
        else req.membres = membres;
        next();
    });
}