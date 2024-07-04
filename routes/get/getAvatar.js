const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const existsUser = require('../put/functions/editUser/existsUser');
const existsAvatar = require('../put/functions/editUser/existsAvatar');

const route = new Route('/get-avatar/:user', async (req, res) => {
  const userId = parseInt(req.params.user, 10);
  if(isNaN(userId)){
    res.status(400).json({message:'El id de usuario debe ser un número entero'});
    return;
  }
  try {
    const userExists = await existsUser(userId);
    if(!userExists){
      res.status(404).json({message:'El usuario no existe'});
      return;
    }
    const avatarExists = await existsAvatar(userId);
    if(!avatarExists){
      res.status(404).json({message:'El usuario no tiene avatar'});
      return;
    }
    db.get('select file_data as data, file_type as type from avatars where user_id = ?', [userId], (err, row) => {
      if(err){
        console.error(err);
        res.status(500).json({message:'Error al buscar el avatar'});
      } else {
        res.setHeader('Content-Type', row.type);
        res.status(200).send(row.data);
      }
    });
  } catch(err){
    if(err instanceof SQLError){
      res.status(500).json({message:err.message});
    } else {
      console.error(err);
      res.status(500).json({message:'Error al buscar el avatar'});
    }
  }
});

module.exports = route;