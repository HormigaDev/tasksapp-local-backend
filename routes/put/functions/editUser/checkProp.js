const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');


/**
 * 
 * @param {string} key 
 * @param {any} value 
 * @param {number} userId 
 * @returns {Promise<boolean>}
 */
function checkProp(key, value, userId){
  const sql = db.read('select/editUser', 'get_user_prop_'+key);
  return new Promise((resolve, reject) => {
    db.get(sql, [userId, value], (err, row) => {
      if(err){
        console.log(err);
        return reject(new SQLError(`¡Ha ocurrido un error al intentar validar la propiedad '${key}'!`));
      } else {
        if(row !== undefined){
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  });
}

module.exports = checkProp;