const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {number} date - Fecha en formato 'YYYY-MM-DD'
 * @returns {Promise<Array>}
 */
function getTaskCalendaryDayData(userId, date){
  const sql = db.read('select', 'tasks_calendary_day');
  return new Promise((resolve, reject) => {
    db.all(sql, [userId, date], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al obtener las tareas del día ${date}`));
      } else {
        resolve(rows);
      }
    })
  });
}

module.exports = getTaskCalendaryDayData;