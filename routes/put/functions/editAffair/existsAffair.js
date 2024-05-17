const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} affairId - ID del asunto 
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>}
 */
function existsAffair(affairId, userId){
  const sql = db.read('select', 'get_affair_by_id');
  return new Promise((resolve, reject) => {
    db.get(sql, [affairId, userId], (err, row) => {
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