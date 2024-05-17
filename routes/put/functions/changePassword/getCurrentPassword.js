const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @returns {Promise<string>}
 */
function getCurrentPassword(userId){
  const sql = db.read('select', 'user_password');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ha ocurrido un error al intentar obtener la contraseña actual!'));
      } else {
        resolve(row.password);
      }
    });
  });
}

module.exports = getCurrentPassword;