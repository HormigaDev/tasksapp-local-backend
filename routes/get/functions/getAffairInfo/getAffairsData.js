const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @param {string} search - El texto de búsqueda
 * @param {number} page - La página actual
 * @param {number} limit - La cantidad de registros por página
 * @param {boolean} archiveds - Si se deben mostrar los asuntos archivados
 * @param {string} order_by - La columna por la que se ordenarán los registros
 * @param {string} asc_desc - El orden de los registros
 * @returns {Promise<Array>}
 */
function getAffairsData(userId, search, page, limit, archiveds, order_by, asc_desc){
  const sql = db.read('select', 'affairs_info', { status: archiveds ? 1:0, column: order_by, order: asc_desc });
  return new Promise((resolve, reject) => {
    db.all(sql, [userId, search, search, limit, page*limit], (err, rows) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al obtener los asuntos`));
      } else {
        resolve(rows);
      }
    });
  })
}

module.exports = getAffairsData;