const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @returns {Promise<Array>}
 */
function getTasks(userId, search, page, limit, order_by, asc_desc, categories){
  const sql = db.read('select', 'tasks', { column: order_by, order: asc_desc, categories: categories.join(", ") });
  return new Promise((resolve, reject) => {
    db.all(sql, [search, search, userId, limit, page*limit], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al intentar obtener las tareas`));
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = getTasks;