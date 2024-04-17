module.exports = async(db) => {
    require('./roles')(db.roles);
    require('./membres')(db.membres);
}