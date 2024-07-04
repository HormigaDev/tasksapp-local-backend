const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @param {string} priorityName - El nombre de la prioridad
 * @returns {Promise<boolean>}
 */
function ignoreGroupedNotifications(userId, priorityName){
  const sql = db.read('update', 'ignore_grouped_notifications');
  return new Promise((resolve, reject) => {
    db.run(sql, [userId, priorityName], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError("Hubo un error al ignorar las notificaciones agrupadas"));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = ignoreGroupedNotifications;