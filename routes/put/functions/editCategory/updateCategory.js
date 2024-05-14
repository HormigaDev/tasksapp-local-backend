const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - La propiedad de la categoría que se desea actualizar
 * @param {any} value - El valor que se desea asignar a la propiedad
 * @param {number} category_id - El id de la categoría que se desea actualizar
 * @returns {Promise<boolean>}
 */
function updateCategory(key, value, category_id){
  const sql = db.read('update/category', 'actualize_category_'+key);
  return new Promise((resolve, reject) => {
    db.run(sql, [value, category_id], err => {
      if(err){
        console.log(err);
        reject(new SQLError(`¡Ha ocurrido un error al intentar actualizar la propiedad ${key} de la categoría!`))
      } else {
        resolve(true);
      }
    })
  });
}

module.exports = updateCategory;