const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} category - Objeto que contiene los datos de la categoría. 
 * @returns {Promise<boolean> | Promise<number>}
 */
function existsCategory(category){
  const sql = db.read('select', 'get_category_from_all_info');
  return new Promise((resolve, reject) => {
    db.get(sql, category.toArray(), (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Error al buscar categoría! Error interno.'));
      }
      if(row){
        resolve(row.id);
      } else {
        resolve(false);
      }
    })
  });
}

module.exports = existsCategory;