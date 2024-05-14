const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// esquemas
const affairTimeline = require('../../schemas/write/AffairTimeline');

// funciones
const saveAffairTimeline = require('./functions/newAffair/saveAffairTimeline');
const validateModel = require('../../helpers/validateModel');

const route = new Route('/new-affair-timeline', async (req, res) => {
  try {
    const r = req.body;
    const newTimeline = {
      affair_id: Number(r.affair_id),
      title: r.title,
      description: r.description
    };
    newTimeline.created_at = new Date().toFormat();
    newTimeline.last_update = new Date().toFormat();

    if(validateModel(newTimeline, affairTimeline)){
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          if(await saveAffairTimeline(newTimeline)){
            await db.commit();
            return res.status(201).json({ message: '¡Línea de tiempo creada correctamente!' });
          }
        } catch(err){
          await db.rollback();
          console.log(err);
          if(err instanceof SQLError){
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: '¡Error al crear la línea de tiempo! Error interno.' });
          }
        }
      });
    }

  } catch(error){
    if(error instanceof ValidationError){
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: '¡Error al crear la línea de tiempo! Error interno.'});
    }
  }
});

module.exports = route;