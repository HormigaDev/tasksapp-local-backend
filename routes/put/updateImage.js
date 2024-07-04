const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const existsUser = require('./functions/editUser/existsUser');
const existsAvatar = require('./functions/editUser/existsAvatar');

const route = new Route('/update-avatar', async (req, res) => {
  try {
    const userId = req.user_id;
    const {avatar, type, name} = req.body;
    if(!['image/png', 'image/jpeg', 'image/jpg'].includes(type)){
      throw new ValidationError('El tipo de archivo no es válido');
    }
    if(!name){
      throw new ValidationError('El nombre del archivo es requerido');
    }
    if(name.length > 255 || name.length < 2){
      throw new ValidationError('El nombre del archivo debe tener entre 2 y 255 caracteres');
    }
    if(!avatar){
      throw new ValidationError('El avatar es requerido');
    }
    if(typeof avatar !== 'string'){
      throw new ValidationError('El avatar debe ser un string (base64)');
    }
    const userExists = await existsUser(userId);
    if(!userExists){
      res.status(404).json({message:'El usuario no existe'});
      return;
    }
    if((avatar.length * 3)/4 > 3 * 1024 * 1024){
      throw new ValidationError('El avatar no puede pesar más de 3MB');
    }
    const avatarExists = await existsAvatar(userId);

    if(!avatarExists){
      const sql = db.read('insert', 'avatar');
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          db.run(sql, [name, type, avatar, userId], async (err) => {
            if(err){
              console.log(err);
              await db.rollback();
              res.status(500).json({message:'Error al actualizar el avatar'});
            } else {
              await db.commit();
              res.status(200).json({message:'Avatar actualizado correctamente'});
            }
          })
        } catch(err){
          await db.rollback();
          if(err instanceof SQLError){
            res.status(500).json({message:err.message});
          } else if(err instanceof ValidationError){
            res.status(400).json({message:err.message});
          } else {
            console.error(err);
            res.status(500).json({message:'Error al actualizar el avatar'});
          }
        }
      })
    } else {
      const sql = db.read('update', 'avatar');
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          db.run(sql, [name, type, avatar, userId], async (err) => {
            if(err){
              console.log(err);
              await db.rollback();
              res.status(500).json({message:'Error al actualizar el avatar'});
            } else {
              await db.commit();
              res.status(200).json({message:'Avatar actualizado correctamente'});
            }
          })
        } catch(err){
          await db.rollback();
          if(err instanceof SQLError){
            res.status(500).json({message:err.message});
          } else if(err instanceof ValidationError){
            res.status(400).json({message:err.message});
          } else {
            console.error(err);
            res.status(500).json({message:'Error al actualizar el avatar'});
          }
        }
      })
    }

  } catch(err){
    if(err instanceof ValidationError){
      res.status(400).json({message:err.message});
    } else if(err instanceof SQLError){
      res.status(500).json({message:err.message});
    } else {
      console.error(err);
      res.status(500).json({message:'Error al actualizar el avatar'});
    }
  }
});

module.exports = route;