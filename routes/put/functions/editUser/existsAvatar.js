const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @returns {Promise<boolean>}
 */
function existsAvatar(userId){
  return new Promise((resolve, reject) => {
    db.get('select id from avatars where user_id = ?', [userId], (err, row) => {
      if(err){
        console.error(err);
        reject(new SQLError("Ocurrió un error al buscar el avatar en la base de datos"));
      } else {
        resolve(row !== undefined)
      }
    })
  })
}

module.exports = existsAvatar;