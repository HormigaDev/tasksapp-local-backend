const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} affairId - ID del asunto 
 * @returns {Promise<boolean>}
 */
function existsAffair(affairId){
  const sql = db.read('select', 'get_affair_by_id');
  return new Promise((resolve, reject) => {
    db.get(sql, [affairId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ha ocurrido un error al intentar verificar la existencia del asunto!'));
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

module.exports = existsAffair;