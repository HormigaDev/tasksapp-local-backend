const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {number} date - Fecha en formato 'YYYY-MM-DD'
 * @returns {Promise<Array>}
 */
function getTasksByDateData(userId, date, query){
  return new Promise((resolve, reject) => {
    db.all(query, [userId, date], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al obtener las tareas para la fecha ${date}`));
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = getTasksByDateData;