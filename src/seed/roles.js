module.exports = async(rolesClass) => {
    const roles = [
        {idRole: 1, nom: 'membre'},
        {idRole: 2, nom: 'admin'},
    ]

    for (const role of roles) {
        await rolesClass.findOrCreate({ where: {idRole: role.idRole}, defaults: role });
    }
}