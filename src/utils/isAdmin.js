module.exports = (req) => {
    return req.user.role === 2;
}