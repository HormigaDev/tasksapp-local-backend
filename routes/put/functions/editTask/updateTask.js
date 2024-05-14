const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - La propiedad de la tarea que se desea actualizar
 * @param {any} value - El valor que se desea asignar a la propiedad
 * @param {number} task_id - El id de la tarea que se desea actualizar
 * @returns {Promise<boolean>}
 */
function updateTask(key, value, task_id){
  const sql = db.read('update/task', 'actualize_task_'+key);
  return new Promise((resolve, reject) => {
    db.run(sql, [value, task_id], err => {
      if(err){
        console.log(err);
        reject(new SQLError(`¡Ha ocurrido un error al intentar actualizar la propiedad ${key} de la tarea!`))
      } else {
        resolve(true);
      }
    })
  });
}

module.exports = updateTask;