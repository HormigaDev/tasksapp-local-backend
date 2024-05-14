const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - Clave a verificar
 * @param {any} value - Valor a verificar
 * @param {number} affairId - Id de la categoría
 * @returns {Promise<boolean>}
 */
function checkProp(key, value, affairId){
  const sql = db.read('select/editAffair', 'get_affair_prop_'+key);
  return new Promise((resolve, reject) => {
    db.get(sql, [value, affairId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError(`¡Error al intentar verificar la propiedad '${key}' de la categoría!`));
      } else {
        resolve(row !== undefined)
      }
    })
  });
}

module.exports = checkProp;