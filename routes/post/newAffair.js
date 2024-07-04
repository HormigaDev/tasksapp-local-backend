const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// esquemas
const affairScheme = require('../../schemas/write/Affair');
const affairTimelineScheme = require('../../schemas/write/AffairTimeline');

// funciones
const saveAffair = require('./functions/newAffair/saveAffair');
const saveAffairTimeline = require('./functions/newAffair/saveAffairTimeline');
const validateModel = require('../../helpers/validateModel');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/new-affair', async (req, res) => {
  try {
    const r = req.body;
    const newAffair = {
      title: r.title,
      person_name: 'default',
      user_id: req.user_id,
      status: 'created'
    }
  
    newAffair.created_at = new Date().toFormat();
    newAffair.last_update = new Date().toFormat();

    if(validateModel(newAffair, affairScheme)){
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          const affairId = await saveAffair(newAffair);
          const userDetails = { affairId };
          await registerLog(req.user_id, 'insert', 'affairs', userDetails.toSnakeCase());
          const newTimeline = {
            affair_id: affairId,
            title: newAffair.title,
            description: r.first_timeline_description,
            created_at: new Date().toFormat(),
            last_update: new Date().toFormat()
          }
          if(validateModel(newTimeline, affairTimelineScheme)){
            const timelineId = await saveAffairTimeline(newTimeline);
            if(timelineId){
              const timelineDetails = { timelineId };
              await registerLog(req.user_id, 'insert', 'timelines', timelineDetails.toSnakeCase());
              await db.commit();
            }
            res.status(201).json({ message: '¡Asunto creado correctamente!' });
          }
        } catch(err){
          await db.rollback();
          console.log(err);
          if(err instanceof SQLError){
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: '¡Error al crear asunto! Error interno.'});
          }
        }
      });
    }

  } catch(error){
    if(error instanceof ValidationError){
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: '¡Error al crear asunto! Error interno.'});
    }
  }
});

module.exports = route;