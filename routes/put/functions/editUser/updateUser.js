const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} prop 
 * @param {any} value 
 * @param {number} user_id 
 * @returns {Promise<boolean> | SQLError}
 */
function updateUser(prop, value, user_id){
  const sql = db.read('update/user', 'actualize_user_'+prop);
  return new Promise((resolve, reject) => {
    db.run(sql, [value, user_id], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError(`Hubo un error al actualizar la propiedad ${prop} del usuario con ID ${user_id}`));
      } else {
        resolve(true);
      }
    });
  })
}

module.exports = updateUser;