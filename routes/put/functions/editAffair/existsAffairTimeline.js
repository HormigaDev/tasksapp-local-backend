const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} affairId - ID del asunto
 * @param {number} timelineId - ID de la línea de tiempo
 * @returns {Promise<boolean>}
 */
function existsAffairTimeline(affairId, timelineId){
  const sql = db.read('select', 'get_affair_timeline_by_id');
  return new Promise((resolve, reject) => {
    db.get(sql, [timelineId, affairId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ha ocurrido un error al intentar verificar la existencia de la línea de tiempo del asunto!'));
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

module.exports = existsAffairTimeline;