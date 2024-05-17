const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const Route = require('../Route');
const db = require('../../database');

// esquemas
const userSchema = require('../../schemas/write/User');
const phoneSchema = require('../../schemas/write/Phone');

//funciones
const existsUser = require('./functions/newUser/existsUser');
const existsPhone = require('./functions/newUser/existsPhone');
const saveUser = require('./functions/newUser/saveUser');
const savePhone = require('./functions/newUser/savePhone');
const relationUserPhone = require('./functions/newUser/relationUserPhone');
const createPriorities = require('./functions/newUser/createPriorities');
const validateModel  = require('../../helpers/validateModel');
const { hash } = require('../../helpers/ciphers');

const route = new Route('/new-user', async (req, res) => {
  try {
    const r = req.body;
    const nu = {
      username: r.username,
      password: r.password,
      email: r.email,
      user_type: r.user_type,
      status: r.status,
      created_at: r.created_at,
      last_update: r.last_update,
      last_session: r.last_session,
      avatar_url: r.avatar_url
    }; // newUser - El objeto que contiene los datos del usuario
  
    const np = {
      ddd: r.ddd,
      ph_number: r.ph_number,
      ph_type: r.ph_type,
    }; // newPhone - El objeto que contiene los datos del teléfono
  
    if(validateModel(nu, userSchema) && validateModel(np, phoneSchema)){
      db.serialize(async () => {
        if(await existsUser(nu.email, nu.username)){
          return res.status(409).json({ message: '¡El usuario ya existe!' });
        }
        await db.commit();
        db.serialize(async () => {
          try {
            await db.begin();
            let phoneId = await existsPhone(np.ddd, np.ph_number, np.ph_type);
            nu.password = await hash(nu.password);
            const userId = await saveUser(nu);
            if(userId){
              if(!phoneId){
                phoneId = await savePhone(np);
              }
              if(phoneId){
                if(await relationUserPhone(userId, phoneId)){
                  if(await createPriorities(userId)){
                    await db.commit();
                    res.status(201).json({ message: '¡Usuario creado con éxito!', userId });
                  }
                }
              }
            }
          } catch(error){
            if(error instanceof SQLError){
              await db.rollback();
              return res.status(409).json({ message: error.message });
            } else {
              console.log(error);
              return res.status(500).json({ message: '¡Error al crear usuario!' });
            }
          }
        });
        // await db.commit();
      });
    }
  } catch(error){
    if(error instanceof ValidationError){
      return res.status(400).json({ message: error.message });
    } else if(error instanceof SQLError){
      await db.rollback();
      return res.status(409).json({ message: error.message });
    } else {
      console.error(error);
      return res.status(500).json({ message: '¡Error al crear usuario!' });
    }
  }
});

module.exports = route;