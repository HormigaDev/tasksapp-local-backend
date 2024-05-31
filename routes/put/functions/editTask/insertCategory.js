const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - El id de la tarea
 * @param {number} categoryId - El id de la categoría
 * @returns {Promise<boolean>}
 */
function insertCategory(taskId, categoryId){
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO tasks_categories (task_id, category_id) VALUES (?, ?)', [taskId, categoryId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('Hubo un error al intentar insertar la categoría'));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = insertCategory;