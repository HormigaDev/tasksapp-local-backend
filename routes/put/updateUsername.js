const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const validateModel = require('../../helpers/validateModel');
const existsUsername = require('./functions/editUser/existsUsername');
const editUsername = require('./functions/editUser/editUsername');
const userIsCurrent = require('./functions/editUser/userIsCurrent');
const { username } = require('../../schemas/write/User');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/update-username', async (req, res) => {
  try {
    const { newUsername } = req.body;
    if(!newUsername){
      throw new ValidationError('Faltan datos. No se proporcionaron los datos necesarios');
    }
    if(await userIsCurrent(req.user_id, newUsername)){
      return res.status(422).json({ message: 'El nombre de usuario es el mismo que el actual' });
    }

    if(validateModel({newUsername}, {newUsername: username})){
      if(await existsUsername(newUsername, req.user_id)){
        return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
      }
      await db.commit();
      db.serialize(async () => {
        try {
          const userDetails = {
            user_id: req.user_id,
            username: []
          }
          await db.begin();
          const prevData = await editUsername(req.user_id, newUsername);
          if(prevData !== undefined){
            userDetails.username = [prevData, newUsername];
            await registerLog(req.user_id, 'update', 'users', userDetails.toSnakeCase());
            await db.commit();
            return res.status(200).json({ message: 'Nombre de usuario actualizado' });
          } else {
            await db.rollback();
            return res.status(500).json({ message: 'No se pudo actualizar el nombre de usuario' });
          }
        } catch(err){
          await db.rollback();
          if(err instanceof SQLError){
            return res.status(500).json({ message: err.message });
          } else {
            console.log(err);
            return res.status(500).json({ message: 'Error interno del servidor' });
          }
        }
      });
    }

  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    } else if(err instanceof SQLError){
      return res.status(500).json({ message: err.message });
    } else {
      console.log(err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

module.exports = route;