const db = require('../../../../database');

/**
 * 
 * @param {string} email - El email del usuario a buscar
 * @param {string} username - El nombre de usuario del usuario a buscar
 * @returns {Promise<boolean>} - Retorna true si el usuario existe
 */
function existsUser(email, username){
  return new Promise((resolve, reject) => {
    const sql = db.read('select', 'get_user_from_email_or_username');
    db.get(sql, [email, username], (err, row) => {
      if(err){
        console.error(err);
        reject(err);
      }
      if(row !== undefined){
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

module.exports = existsUser;