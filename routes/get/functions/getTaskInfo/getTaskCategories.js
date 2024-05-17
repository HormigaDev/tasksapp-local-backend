const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - ID de la tarea
 * @returns {Promise<Array<object>>}
 */
function getTaskCategories(taskId){
  const sql = db.read('select', 'task_categories');
  return new Promise((resolve, reject) => {
    db.all(sql, [taskId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Ocurrió un error al intentar obtener las categorías de la tarea con ID '${taskId}'`));
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = getTaskCategories;