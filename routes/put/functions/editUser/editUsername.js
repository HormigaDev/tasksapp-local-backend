const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El ID del usuario a editar
 * @param {string} newUsername - El nuevo nombre de usuario
 * @returns {Promise<string> | Promise<undefined>}
 */
function editUsername(userId, newUsername){
  const sql = db.read('update', 'user_username');
  return new Promise((resolve, reject) => {
    db.get(`select username from users where id = ?`, [userId], (error, prevData) => {
      if(error){
        console.log(error);
        reject(new SQLError('Hubo un error al obtener los datos previos del usuario'));
      } else {
        db.run(sql, [newUsername, userId], err => {
          if(err){
            console.log(err);
            reject(new SQLError('Hubo un error al intentar actualizar el nombre de usuario'));
          } else {
            resolve(prevData ? prevData.username : undefined);
          }
        })
      }
    });
  })
}

module.exports = editUsername;