const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} task_id 
 * @returns {Promise<boolean>}
 */
function existsTask(task_id){
  const sql = db.read('select', 'exists_task');
  return new Promise((resolve, reject) => {
    db.get(sql, [task_id], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ha ocurrido un error al intentar verificar la existencia de la tarea!'));
      } else {
        if(row !== undefined){
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  });
}

module.exports = existsTask;