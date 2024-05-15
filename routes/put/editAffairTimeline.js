const Route = require('../Route');
const SQLError = require('../../classes/SQLError');
const ValidationError = require('../../classes/ValidationError');

// esquemas
const affairScheme = require('../../schemas/actualize/AffairTimeline');

// funciones
const validateProp = require('../../helpers/validateProp');
const existsAffair = require('./functions/editAffair/existsAffair');
const existsAffairTimeline = require('./functions/editAffair/existsAffairTimeline');
const checkProp = require('./functions/editAffair/checkProp');
const updateAffairTimeline = require('./functions/editAffair/updateAffair');

const route = new Route('/edit-affair-timeline', async (req, res) => {
    try {
      const r = req.body;
      const affair_id = Number(r.affair_id);
      const timeline_id = Number(r.timeline_id);
      const affairTimeline = {
        title: r.title,
        description: r.description,
      };
      if(!await existsAffair(affair_id)) throw new ValidationError(`El asunto con id '${affair_id}' no existe.`);
      if(!await existsAffairTimeline(affair_id, timeline_id)) throw new ValidationError(`La línea de tiempo con id '${timeline_id}' no existe.`);
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          for(const key of Object.keys(affairTimeline)){
            const value = affairTimeline[key];
            if(!value){
              if(value !== 0) continue;
            }
            if(validateProp(key, value, affairScheme)){
              if(await checkProp('timeline_'+key, value, affair_id)) continue;
              await updateAffairTimeline('timeline_'+key, value, timeline_id);
            } 
          }
        } catch(err){
          await db.rollback();
          if(err instanceof SQLError) return res.status(500).json({ error: err.message });
          if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
          console.log(err);
          return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar la línea de tiempo del asunto!' });
        }
      });
    } catch(err){
      if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
      console.log(err);
      res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar la línea de tiempo del asunto!' });
    }
  });

module.exports = route;