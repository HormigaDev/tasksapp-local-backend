const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @param {number} categoryId - ID de la categoría
 * @returns {Promise<boolean>} - Retorna true si la categoría existe de lo contrario retorna false
 */
function existsCategory(userId, categoryId){
  const sql = db.read('select', 'task_category_exists');
  return new Promise((resolve, reject) => {
    db.get(sql, [userId, categoryId], (err, row) => {
      if(err) return reject(new SQLError('Error al buscar la categoría en la base de datos.'));
      if(row) return resolve(true);
      return resolve(false);
    })
  });
}

module.exports = existsCategory;