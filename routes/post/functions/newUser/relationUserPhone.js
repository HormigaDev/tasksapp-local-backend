const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} user_id - El id del usuario
 * @param {number} phone_id - El id del teléfono
 * @returns {Promise<boolean>} - Retorna true si la relación se creó correctamente
 */
function relationUserPhone(user_id, phone_id){
  return new Promise((resolve, reject) => {
    const sql = db.read('insert', 'new_user_phone');
    db.run(sql, [user_id, phone_id], err => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Ocurrió un error al intentar guardar la relación entre el usuario y el teléfono!'));
      }
      resolve(true);
    });
  })
}

module.exports = relationUserPhone;