const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - ID de la tarea
 * @returns {Promise<object>}
 */
function getTaskData(taskId){
  const sql = db.read('select', 'task_info');
  return new Promise((resolve, reject) => {
    db.get(sql, [taskId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Ocurrió un error al intentar obtener los datos de la tarea con ID '${taskId}'`));
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = getTaskData;