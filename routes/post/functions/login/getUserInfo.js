const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} email_username - El email o el nombre de usuario del usuario
 * @returns {Promise<object>}
 */
function getUserInfo(email_username){
  const sql = db.read('select', 'login_user');
  return new Promise((resolve, reject) => {
    db.get(sql, [email_username, email_username], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al buscar el usuario ${email_username}`));
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = getUserInfo;