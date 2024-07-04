const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario 
 * @param {number} taskId - El id de la tarea
 * @returns {Promise<boolean>}
 */
function ignoreNotification(userId, taskId){
  const sql = db.read('update', 'ignore_notification');
  return new Promise((resolve, reject) => {
    db.run(sql, [userId, taskId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError("Hubo un error al ignorar la notificación"));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = ignoreNotification;