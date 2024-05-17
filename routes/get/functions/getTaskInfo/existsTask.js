const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - ID de la tarea
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>}
 */
function existsTask (taskId, userId){
  return new Promise((resolve, reject) => {
    db.get('select id from tasks where id = ? and user_id = ?', [taskId, userId], (err, row) => {
      if(err){
        console.log(err);
        return reject(new SQLError(`Ocurrion un error al intentar verificar la existencia de la tarea con ID '${taskId}'`));
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

module.exports = existsTask;