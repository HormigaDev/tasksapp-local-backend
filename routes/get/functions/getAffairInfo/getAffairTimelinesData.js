const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} affairId - ID del asunto
 * @returns {Promise<Array>}
 */
function getAffairTimelinesData(affairId){
  const sql = db.read('select', 'affair_timelines');
  return new Promise((resolve, reject) => {
    db.all(sql, [affairId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al intentar obtener las líneas de tiempo del asunto '${affairId}'`));
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = getAffairTimelinesData;