const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - ID de la tarea a eliminar
 * @param {string} sql - Sentencia SQL a ejecutar
 * @returns {Promise<boolean>}
 */
function removeTaskData(taskId, sql){
  return new Promise((resolve, reject) => {
    db.run(sql, [taskId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al eliminar los datos de la tarea con ID '${taskId}'`));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = removeTaskData;