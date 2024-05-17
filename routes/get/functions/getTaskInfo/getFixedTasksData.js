const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario  
 * @returns {Promise<Array>}
 */
function getFixedTasksData(userId){
  const sql = db.read('select', 'fixed_tasks');
  return new Promise((resolve, reject) => {
    db.all(sql, [userId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Ha ocurrido un error al intentar obtener las tareas fijas`));
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = getFixedTasksData;