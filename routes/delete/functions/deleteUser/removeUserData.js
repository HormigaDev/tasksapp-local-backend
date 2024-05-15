const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario a eliminar
 * @param {string} sql - Sentencia SQL para eliminar el usuario
 * @returns {Promise<boolean>}
 */
function removeUserData(userId, sql){
  return new Promise((resolve, reject) => {
    db.run(sql, [userId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Error al eliminar el usuario con ID '${userId}'`));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = removeUserData;