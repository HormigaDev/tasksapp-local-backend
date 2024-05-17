const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<boolean>}
 */
function changeUserPassword(userId, newPassword){
  const sql = db.read('update/user', 'user_password');
  return new Promise((resolve, reject) => {
    db.run(sql, [newPassword, userId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ha ocurrido un error al intentar cambiar la contraseña!'));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = changeUserPassword;