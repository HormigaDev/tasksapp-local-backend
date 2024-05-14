const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - Clave a verificar
 * @param {any} value - Valor a verificar
 * @param {number} taskId - Id de la tarea
 * @returns {Promise<boolean>}
 */
function checkProp(key, value, taskId){
  const sql = db.read('select/editTask', 'get_task_prop_'+key);
  return new Promise((resolve, reject) => {
    db.get(sql, [taskId, value], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError(`¡Error al intentar verificar la propiedad '${key}' de la tarea!`));
      } else {
        if(row) resolve(true);
        else resolve(false);
      }
    })
  });
}

module.exports = checkProp;