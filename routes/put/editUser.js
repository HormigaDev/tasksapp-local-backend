const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// esquemas
const userScheme = require('../../schemas/actualize/User');

// funciones
const validateProp = require('../../helpers/validateProp');
const updateUser = require('./functions/editUser/updateUser');
const checkProp = require('./functions/editUser/checkProp');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/edit-user', async (req, res) => {
  try {
    const r = req.body;
    const updates = {
      username: r.username,
      email: r.email,
      avatar_url: r.avatar_url
    };
    await db.commit();
    db.serialize(async () => {
      try {
        const userDetails = {
          user_id: req.user_id,
          username: [],
          email: [],
          avatar_url: []
        }
        for(const key of Object.keys(updates)){
          const value = updates[key];
          if(!value) continue;
          if(validateProp(key, value, userScheme)){
            if(await checkProp(key, value, req.user_id)) continue;
            const prevData = await updateUser(key, value, req.user_id);
            if(prevData !== undefined){
              userDetails[key] = [prevData, value];
            }
          }
        }
        await updateUser('last_update', new Date().toFormat(), req.user_id);
        for(const key of Object.keys(userDetails).slice(1)){
          if(userDetails[key].length === 0) delete userDetails[key];
        }
        await registerLog(req.user_id, 'update', 'users', userDetails.toSnakeCase());
        await db.commit();
        res.status(200).json({ message: '¡Usuario actualizado correctamente!' });
      } catch(err){
        await db.rollback();
        console.log(err);
        if(err instanceof SQLError) return res.status(500).json({ error: err.message });
        if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
        return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar el usuario!' }); 
      }
    });
    
  } catch(err){
    if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
    console.log(err);
    return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar el usuario!' });
  }
});

module.exports = route;