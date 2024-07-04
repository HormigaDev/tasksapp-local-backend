const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const existsUser = require('./functions/deleteUser/existsUser');
const removeUserData = require('./functions/deleteUser/removeUserData');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/delete-user', async (req, res) => {
  try {
    const userId = req.user_id;
    if(!await existsUser(userId)) throw new ValidationError(`El usuario con ID '${userId}' no existe`);
    await db.commit();
    db.serialize(async () => {
      try {
        const details = {
          userId,
          authorId: userId
        }
        await db.begin();
        const queries = db.read('delete', 'user_info').split(";").map(query => query.trim());
        for(const query of queries){
          try {
            await removeUserData(userId, query);
          } catch(err){
            console.log(err);
          }
        }
        await registerLog(userId, 'delete', 'users', details.toSnakeCase());
        await db.commit();
        res.status(200).json({ message: `El usuario con ID '${userId}' ha sido eliminado correctamente` });
      } catch(err){
        await db.rollback();
        if(err instanceof SQLError){
          return res.status(400).json({ error: err.message });
        }
        console.log(err);
        res.status(500).json({ error: 'Ha ocurrido un error inesperado. Error interno' });
      }
    })
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ error: err.message });
    }
    console.log(err);
    res.status(500).json({ error: 'Ha ocurrido un error inesperado. Error interno' });
  }
});

module.exports = route;