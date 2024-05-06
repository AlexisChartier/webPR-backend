const db = require('../models')
const points = db.points

const pointsController = {
    
        async getPoints(req, res) {
            try{
                let points = await points.findAll();
                return res.status(200).json(points);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        },
    
        async getPointByPseudo(req, res) {
            try{
                const point = await points.findAll({
                    where: {pseudo: req.params.pseudo}
                });
                return res.status(200).json(point);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        },
    
        async getPointByDate(req, res) {
            try{
                const point = await points.findAll({
                    where: {date: req.params.date}
                });
                return res.status(200).json(point);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        },

        async getPoibtsByTache(req, res) {
            try{
                const point = await points.findAll({
                    where: {id_tache: req.params.id_tache}
                });
                return res.status(200).json(point);
            } catch(error){
                return res.status(400).json({error: error.message});
            }
        }
    }

    module.exports = pointsController;