const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>}
 */
function getUserData(userId){
  const sql = db.read('select', 'user_info');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al intentar obtener los datos del usuario con ID '${userId}'`));
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = getUserData;