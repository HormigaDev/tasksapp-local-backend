const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const route = new Route('/get-username', async(req, res) => {
  try {
    const userId = req.user_id;
    db.get('select username from users where id = ?', [userId], (err, row) => {
      if(err){
        console.log(err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        return res.status(200).json({ username: row.username });
      }
    })
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