const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} category_id - El id de la categoría a verificar
 * @param {number} user_id - El id del usuario vinculado a la categoría
 * @returns {Promise<boolean>}
 */
function existsCategory(category_id, user_id){
  const sql = db.read('select/editCategory', 'exists_category');
  return new Promise((resolve, reject) => {
    db.get(sql, [category_id, user_id], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ha ocurrido un error al intentar verificar la existencia de la categoría!'));
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

module.exports = existsCategory;