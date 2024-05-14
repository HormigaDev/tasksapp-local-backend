const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - ID de la tarea 
 * @param {number} categoryId - ID de la categoría 
 * @returns {Promise<boolean>} - Retorna true si la relación se realizó correctamente
 */
function relationTaskCategory(taskId, categoryId){
  const sql = db.read('insert', 'new_task_category');
  return new Promise((resolve, reject) => {
    db.run(sql, [taskId, categoryId], async (err) => {
      if(err) return reject(new SQLError('Error al relacionar la tarea con la categoría.'));
      resolve(true);
    });
  });
}

module.exports = relationTaskCategory;