const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {string} dateStart - Fecha de inicio en formato 'YYYY-MM-DD'
 * @param {string} dateEnd - Fecha de fin en formato 'YYYY-MM-DD'
 * @returns {Promise<Object>}
 */
function getAffairStats(userId, dateStart, dateEnd){
  const sql = db.read('select', 'affairs_stats');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId, dateStart, dateEnd], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError("Hubo un error al obtener las estadísticas de asuntos"));
      } else {
        resolve(row);
      }
    })
  });
}

module.exports = getAffairStats;