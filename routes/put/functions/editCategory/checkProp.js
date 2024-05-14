const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - Clave a verificar
 * @param {any} value - Valor a verificar
 * @param {number} categoryId - Id de la categoría
 * @returns {Promise<boolean>}
 */
function checkProp(key, value, categoryId){
  const sql = db.read('select/editCategory', 'get_category_prop_'+key);
  return new Promise((resolve, reject) => {
    db.get(sql, [value, categoryId], (err, row) => {
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