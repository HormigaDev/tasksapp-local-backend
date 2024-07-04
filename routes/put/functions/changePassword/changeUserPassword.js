const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<string> | Promise<undefined>}
 */
function changeUserPassword(userId, newPassword){
  const sql = db.read('update/user', 'user_password');
  return new Promise((resolve, reject) => {
    db.get(`select password from users where id = ?`, [userId], (error, prevData) => {
      if(error){
        console.log(error);
        reject(new SQLError("Hubo un error al obtener los datos previos del usuario"));
      } else {
        db.run(sql, [newPassword, userId], (err) => {
          if(err){
            console.log(err);
            reject(new SQLError('¡Ha ocurrido un error al intentar cambiar la contraseña!'));
          } else {
            resolve(prevData ? prevData.password : undefined);
          }
        });
      }
    });
  });
}

module.exports = changeUserPassword;