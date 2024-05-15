const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} categoryId - ID de la categoría a eliminar
 * @param {string} query - Sentencia SQL para eliminar la categoría
 * @returns {Promise<boolean>}
 */
function removeCategoryData(categoryId, query){
  return new Promise((resolve, reject) => {
    db.run(query, [categoryId], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al intentar eliminar la categoría con ID '${categoryId}'`));
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = removeCategoryData;