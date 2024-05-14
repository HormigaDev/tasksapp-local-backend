const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - Clave a actualizar
 * @param {any} value - Valor a actualizar
 * @param {number} affairId - Id del asunto
 * @returns {Promise<boolean>}
 */
function updateAffair(key, value, affairId){
  const sql = db.read('update/affair', 'actualize_affair_'+key);
  return new Promise((resolve, reject) => {
    db.run(sql, [value, affairId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError(`¡Error al intentar actualizar la propiedad '${key}' del asunto!`));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = updateAffair;