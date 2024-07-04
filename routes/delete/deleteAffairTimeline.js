const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// funciones
const existsAffairTimeline = require('../put/functions/editAffair/existsAffairTimeline');
const removeAffairData = require('./functions/deleteAffair/removeAffairData');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/delete-affair-timeline', async (req, res) => {
  try {
    const affairId = Number(req.query.affair_id);
    const timelineId = Number(req.query.timeline_id);
    if(isNaN(affairId)) throw new ValidationError('El ID del asunto debe ser un número');
    if(isNaN(timelineId)) throw new ValidationError('El ID de la línea de tiempo debe ser un número');

    if(!await existsAffairTimeline(affairId, timelineId)) throw new ValidationError(`La línea de tiempo con ID '${timelineId}' no existe en el asunto con ID '${affairId}'`);

    await db.commit();
    db.serialize(async () => {
      try {
        const details = {
          userId: req.user_id,
          affairId,
          timelineId
        }
        const query = db.read('delete', 'affair_timeline');
        await db.begin();
        await removeAffairData(timelineId, query);
        await registerLog(req.user_id, 'delete', 'timelines', details.toSnakeCase());
        await db.commit();
        res.status(200).json({ message: `La línea de tiempo con ID '${timelineId}' ha sido eliminada correctamente.` });
      } catch(err){
        await db.rollback();
        if(err instanceof SQLError){
          return res.status(500).json({error: err.message});
        }
        console.log(err);
        res.status(500).json({ message: `Hubo un error al intentar eliminar la línea de tiempo del asunto. Error interno` });
      }
    });
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({error: err.message});
    }
    console.log(err);
    res.status(500).json({ message: `Hubo un error al intentar eliminar la línea de tiempo del asunto. Error interno` });
  }
});

module.exports = route;