const db = require('../database');
const SQLError = require('../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario a verificar
 * @param {string} permission - El permiso a verificar
 * @returns {Promise<boolean>}
 */
function hasPermission(userId, permission){
  const sql = `
    select p.name as name from user_permissions up
    inner join permissions p on p.name = ?
    where up.user_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [permission, userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('Ocurrió un error al verificar los permisos del usuario.'));
      } else {
        resolve(row ? true : false);
      }
    });
  })
}

module.exports = hasPermission;