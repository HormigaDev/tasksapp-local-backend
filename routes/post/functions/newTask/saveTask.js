const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newTask - Objeto con los datos de la nueva tarea 
 * @returns {Promise<number>} - Retorna el ID de la tarea guardada
 */
function saveTask(newTask){
  const sql = db.read('insert', 'new_task');
  return new Promise((resolve, reject) => {
    db.run(sql, newTask.toArray(), async (err) => {
      if(err) return reject(new SQLError('Error al guardar la tarea en la base de datos.'));
      resolve(await db.last_rowid());
    });
  });
}

module.exports = saveTask;