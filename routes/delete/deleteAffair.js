const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// funciones
const existsAffair = require('../put/functions/editAffair/existsAffair');
const removeAffairData = require('./functions/deleteAffair/removeAffairData');

const route = new Route('/delete-affair', async (req, res) => {
  try {
    const affairId = Number(req.query.affair_id);
    if(isNaN(affairId)){
      throw new ValidationError('El ID del asunto debe ser un número');
    }
    if(!await existsAffair(affairId)){
      throw new ValidationError(`El asunto con ID '${affairId}' no existe`);
    }
    await db.commit();
    db.serialize(async () => {
      try {
        const queries = db.read('delete', 'affair_info').split(";");
        await db.begin();

        for(const query of queries){
          await removeAffairData(affairId, query);
        }

        await db.commit();
        res.status(200).json({ message: `El asunto con ID '${affairId}' ha sido eliminado correctamente.` });
      } catch(err){
        await db.rollback();
        if(err instanceof SQLError){
          return res.status(500).json({error: err.message});
        }
        console.log(err);
        res.status(500).json({ message: `Hubo un error al intentar eliminar el asunto. Error interno` });
      }
    });
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({error: err.message});
    }
    console.log(err);
    res.status(500).json({ message: `Hubo un error al intentar eliminar el asunto. Error interno` });
  }
});

module.exports = route;