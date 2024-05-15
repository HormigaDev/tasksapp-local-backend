const Route = require('../Route');
const SQLError = require('../../classes/SQLError');
const ValidationError = require('../../classes/ValidationError');

// esquemas
const affairScheme = require('../../schemas/actualize/Affair');

// funciones
const validateProp = require('../../helpers/validateProp');
const existsAffair = require('./functions/editAffair/existsAffair');
const checkProp = require('./functions/editAffair/checkProp');
const updateAffair = require('./functions/editAffair/updateAffair');

const route = new Route('/edit-affair', async (req, res) => {
    try {
      const r = req.body;
      const affairId = Number(r.affair_id);
      const affair = {
        title: r.title,
        person_name: r.person_name,
      };
      if(!await existsAffair(affairId)) throw new ValidationError(`El asunto con id '${affairId}' no existe.`);
      await db.commit();
      db.serialize(async () => {
        try {
          for(const key of Object.keys(affair)){
            const value = affair[key];
            if(!value){
              if(value !== 0) continue;
            }
            if(validateProp(key, value, affairScheme)){
              if(await checkProp(key, value, affairId)) continue;
              await updateAffair(key, value, affairId);
            } 
          }
          await updateAffair('last_update', new Date().toFormat(), affairId);
          await db.commit();
          res.status(200).json({ message: '¡Asunto actualizado correctamente!' });
        } catch(err){
          console.log(err);
          await db.rollback();
          if(err instanceof SQLError) return res.status(500).json({ error: err.message });
          if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
          return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar el asunto!' });
        }
      });
    } catch(err){
      console.log(err);
      if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
      return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar el asunto!' });
    }
});

module.exports = route;