const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @returns {Promise<Array<object>>}
 */
function getUngroupedNotifications(userId){
  const sql = db.read('select', 'ungrouped_notifications');
  return new Promise((resolve, reject) => {
    db.all(sql, [userId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError("Hubo un error al obtener las notificaciones no agrupadas"))
      } else {
        resolve(rows);
      }
    })
  });
}

module.exports = getUngroupedNotifications;