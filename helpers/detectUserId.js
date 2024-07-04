const SQLError = require('../classes/SQLError');
const validateEndpoints = require('./validateEnpoints');
const db = require('../database');

function existsUser(userId){
  return new Promise((resolve, reject) => {
    db.get('SELECT id FROM users WHERE id = ?', [userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Error al identificar el usuario!'));
      }
      if(row !== undefined){
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function detectUserId(req, res, next){
  const method = req.method.toLowerCase();
  const url = req.url;
  const route = url.split('/')[1].split('?')[0];
  const userId = Number(req.headers['user-id']);
  if(validateEndpoints[method]?.includes(route)){
    if(isNaN(userId)){
      res.status(400).json({ message: '¡El encabezado User-Id no es un número!'});
      return;
    }
    if(userId !== undefined){
      try {
        const userExists = await existsUser(userId);
        if(!userExists){
          res.status(404).json({ message: '¡El usuario no existe!'});
          return;
        }
        req.user_id = userId;
      } catch(err){
        if(err instanceof SQLError){
          res.status(500).json({ message: err.message });
        } else {
          console.log(err);
          res.status(500).json({ message: '¡Error al identificar el usuario! Error interno.'});
        }
      }
      next();
      return;
    } else {
      res.status(401).json({ message: '¡No se ha proporcionado el encabezado User-Id!'});
    }
  } else {
    next();
  }
}

module.exports = detectUserId;