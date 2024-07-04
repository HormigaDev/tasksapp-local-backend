const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError'); 

/**
 * 
 * @param {number} userId - El id del usuario
 * @returns {Promise<Array<object>>}
 */
function getGroupedNotifications(userId){
  const sql = db.read('select', 'grouped_notifications');
  return new Promise((resolve, reject) => {
    db.all(sql, [userId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError("Hubo un error al obtener las notificaciones agrupadas"))
      } else {
        resolve(rows);
      }
    })
  });
}

module.exports = getGroupedNotifications;