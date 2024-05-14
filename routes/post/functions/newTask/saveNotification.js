const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

function saveNotification(taskId, userId){
  const sql = db.read('insert', 'new_notification');
  return new Promise((resolve, reject) => {
    db.run(sql, [taskId, userId, 'pending', 0], (err) => {
      if(err) {
        console.error(err);
        return reject(new SQLError('Error al guardar la notificación en la base de datos.'));
      }
      resolve(true);
    });
  });
}

module.exports = saveNotification;