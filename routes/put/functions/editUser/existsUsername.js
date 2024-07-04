const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} username - El nombre de usuario a buscar
 * @param {number} userId - El id del usuario que se está editando
 * @returns {Promise<boolean>}
 */
function existsUsername(username, userId){
  const sql = db.read('select', 'user_by_username');
  return new Promise((resolve, reject) => {
    db.get(sql, [username, userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('Hubo un error al intentar buscar el nombre de usuario'));
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

module.exports = existsUsername;