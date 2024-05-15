const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario a verificar
 * @returns {Promise<boolean>}
 */
function existsUser(userId){
  const sql = 'select id from users where id = ?';
  return new Promise((resolve, reject) => {
    db.get(sql, [userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Error al verificar la existencia del usuario con ID '${userId}'`));
      } else {
        resolve(row !== undefined);
      }
    })
  });
}

module.exports = existsUser;