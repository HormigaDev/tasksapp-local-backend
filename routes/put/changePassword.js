const Route = require('../Route');
const SQLError = require('../../classes/SQLError');
const ValidationError = require('../../classes/ValidationError');
const db = require('../../database');

// esquemas
const { password } = require('../../schemas/write/User');
const schema = {
  prevPassword: password,
  newPassword: password,
};

// funciones
const validateModel = require('../../helpers/validateModel');
const changeUserPassword = require('./functions/changePassword/changeUserPassword');
const getCurrentPassword = require('./functions/changePassword/getCurrentPassword');
const { hash, compare } = require('../../helpers/ciphers');

const route = new Route('/change-password', async (req, res) => {
  try {
    const { prev_password: prevPassword, new_password: newPassword } = req.body;
    if(!prevPassword || !newPassword) throw new ValidationError('La contraseña actual y la nueva contraseña son requeridas.');
    if(prevPassword === newPassword) throw new ValidationError('La nueva contraseña no puede ser igual a la contraseña actual.');
    
    if(validateModel({prevPassword, newPassword}, schema)){

      const currentPassword = await getCurrentPassword(req.user_id);
      if(!currentPassword) throw new ValidationError('¡La contraseña actual no coincide con la registrada en la base de datos!');
      if(!await compare(prevPassword, currentPassword)) throw new ValidationError('¡La contraseña actual no coincide con la registrada en la base de datos!');

      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          if(await changeUserPassword(req.user_id, await hash(newPassword))){
            await db.commit();
            res.status(200).json({ message: '¡Contraseña cambiada correctamente!' });
          }
        } catch(err){
          await db.rollback();
          if(err instanceof SQLError) return res.status(500).json({ error: err.message });
          console.log(err);
          return res.status(500).json({ error: '¡Ha ocurrido un error al intentar cambiar la contraseña!' });
        }
      });
    }
  
  } catch(err){
    if(err instanceof ValidationError || err instanceof SQLError){
      return res.status(400).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: '¡Ha ocurrido un error al intentar cambiar la contraseña!' });
  }
});

module.exports = route;