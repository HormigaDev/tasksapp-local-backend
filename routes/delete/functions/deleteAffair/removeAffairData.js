const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} affairId - ID del asunto a eliminar
 * @param {string} sql - Sentencia SQL a ejecutar
 * @returns {Promise<boolean>}
 */
function removeAffairData(affairId, sql){
  return new Promise((resolve, reject) => {
    db.run(sql, [affairId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al eliminar los datos del asunto con ID '${affairId}'`));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = removeAffairData;