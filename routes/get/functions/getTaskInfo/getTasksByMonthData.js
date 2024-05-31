const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {number} month - Mes a consultar
 * @param {number} year - Año del mes a consultar
 * @returns {Promise<Array>}
 */
function getTasksByMonthData(userId, month, year){
  const firstDay = `${year}-${('0'+month).slice(-2)}-01`
  const sql = db.read('select', 'tasks_of_month');
  return new Promise((resolve, reject) => {
    db.all(sql, [firstDay, firstDay, userId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al obtener las tareas del mes ${month} del usuario ${userId}`));
      } else {
        resolve(rows);
      }
    })
  });
}

module.exports = getTasksByMonthData;