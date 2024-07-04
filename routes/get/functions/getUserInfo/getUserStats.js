const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {string} dateStart - Fecha de inicio en formato 'YYYY-MM-DD'
 * @param {string} dateEnd - Fecha de fin en formato 'YYYY-MM-DD'
 * @returns {Promise<object>}
 */
function getUserStats(userId, dateStart, dateEnd){
  const sql = db.read('select', 'stats');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId, dateStart, dateEnd], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError("Ocurrió un error al obtener las estadísticas del usuario"));
      } else {
        resolve(row);
      }
    });
  })
}

module.exports = getUserStats;