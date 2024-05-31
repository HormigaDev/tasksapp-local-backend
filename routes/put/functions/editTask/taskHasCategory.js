const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - El id de la tarea
 * @param {number} categoryId - El id de la categoría
 * @returns {Promise<boolean>}
 */
function taskHasCategory(taskId, categoryId){
  return new Promise((resolve, reject) => {
    db.get('SELECT category_id FROM tasks_categories WHERE task_id = ? AND category_id = ?', [taskId, categoryId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('Hubo un error al intentar verificar si la tarea tiene la categoría'));
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

module.exports = taskHasCategory;