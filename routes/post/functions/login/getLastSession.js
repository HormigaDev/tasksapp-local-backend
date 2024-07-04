const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @returns {Promise<string> | Promise<null>}
 */
function getLastSession(userId){
  const sql = db.read('select', 'user_last_session');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('Hubo un error al intentar obtener la última sesión del usuario'));
      } else {
        resolve(row?.last_session)
      }
    })
  });
}

module.exports = getLastSession;