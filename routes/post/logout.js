const Route = require('../Route');
const configurations = require('../../configs');
const db = require('../../database');

const route = new Route('/logout', async(req, res) => {
  try {
    const userId = req.user_id;
    const user = configurations.get('currentLoggedUserId');
    if(userId === user){
      configurations.set('currentLoggedUserId', null);
    } else {
      res.status(403).json({ message: '¡Error al cerrar sesión! No tienes permisos para cerrar la sesión de otro usuario.' });
    }
  } catch(err){
    console.error(err);
    res.status(500).json({ message: '¡Error al cerrar sesión! Error interno.' });
  }
});

module.exports = route;