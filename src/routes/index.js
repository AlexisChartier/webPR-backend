module.exports = (app) => {
    app.use('punkRecord/api', require('./membres.routes'))
    app.use('punkRecord/api', require('./projets.routes'))
    app.use('punkRecord/api', require('./taches.routes'))
    //app.use('punkRecord/api', require('./membresProjets.routes'))
    //app.use('punkRecord/api', require('./membresTaches.routes'))
    app.use('punkRecord/api', require('./notifications.routes'))
    app.use('punkRecord/api', require('./participations.routes'))
    app.use('punkRecord/api', require('./points.routes'))
    app.use('punkRecord/api', require('./roles.routes'))
}