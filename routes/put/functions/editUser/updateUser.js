const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} prop 
 * @param {any} value 
 * @param {number} user_id 
 * @returns {Promise<any>}
 */
function updateUser(prop, value, user_id){
  const sql = db.read('update/user', 'actualize_user_'+prop);
  return new Promise((resolve, reject) => {
    db.get(`select ${prop} from users where id = ?`, [user_id], (error, prevData) => {
      if(error){
        console.log(error);
        reject(new SQLError('Hubo un error al obtener los datos previos del usuario'));
      } else {
        db.run(sql, [value, user_id], (err) => {
          if(err){
            console.log(err);
            reject(new SQLError(`Hubo un error al actualizar la propiedad ${prop} del usuario con ID ${user_id}`));
          } else {
            resolve(prevData ? prevData[prop] : undefined);
          }
        });
      }
    });
    
  })
}

module.exports = updateUser;