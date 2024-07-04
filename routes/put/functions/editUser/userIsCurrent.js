const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @param {string} username - El nombre de usuario
 * @returns {Promise<boolean>}
 */
function userIsCurrent(userId, username){
  const sql = db.read('select', 'user_is_current');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId, username], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError("Hubo un error al intentar verificar si el usuario es el actual"));
      } else {
        resolve(row !== undefined);
      }
    })
  });
}

module.exports = userIsCurrent;