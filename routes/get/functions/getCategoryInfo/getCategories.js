const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - ID del usuario
 * @returns {Promise<Array>}
 */
function getCategories(userId){
  const sql = db.read('select', 'categories');
  return new Promise((resolve, reject) => {
    db.all(sql, [userId], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al intentar obtener las categorías`));
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = getCategories;