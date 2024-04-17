const {hashPassword} = require('../utils/hashPassword');
module.exports = async(membresClass) => {
    const membres = {
        prenom: 'admin',
        nom: 'admin',
        email: 'admin@gmail.com',
        dateInscription: new Date(),
        password: await hashPassword('admin'),
        role: 2,
    } 

    await membresClass.findOrCreate({ where: {email: membres.email}, defaults: membres });
}