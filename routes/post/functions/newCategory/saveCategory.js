const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newCategory 
 * @returns {Promise<number>}
 */
function saveCategory(newCategory){
  const sql = db.read('insert', 'new_category');
  return new Promise((resolve, reject) => {
    db.run(sql, newCategory.toArray(), async (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Error al crear categoría! Error interno.'));
      }
      resolve(await db.last_rowid());
    });
  });
}

module.exports = saveCategory;