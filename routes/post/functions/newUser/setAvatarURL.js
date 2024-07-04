const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @returns {Promise<boolean>}
 */
function setAvatarURL(userId){
  const sql = db.read('update', 'user_avatar_url');
  return new Promise((resolve, reject) => {
    db.run(sql, [`${db.APP_URL}/get-avatar/${userId}`, userId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('Error al actualizar la URL del avatar'));
      } else {
        resolve(true);
      }
    });
  })
}

module.exports = setAvatarURL;