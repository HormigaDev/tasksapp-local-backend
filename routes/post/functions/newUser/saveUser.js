const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newUser  - El objeto que contiene los datos del nuevo usuario 
 * @returns {Promise<number>} - Retorna el id del usuario creado
 */
function saveUser(newUser){
  const newUserQuery = db.read('insert', 'new_user');
  const getUserQuery = db.read('select', 'get_user_from_email');
  return new Promise((resolve, reject) => {
    db.run(newUserQuery, newUser.toArray(), async (err) => {
      if(err){
        console.error(err);
        reject(new SQLError('¡Ocurrió un error al intentar guardar los datos del usuario!'));
      } else {
        db.get(getUserQuery, [newUser.email], (err, row) => {
          if(err){
            console.error(err);
            reject(new SQLError('¡Ocurrió un error al intentar obtener el id del usuario!'));
          }
          if(row){
            resolve(row.id);
          } else {
            reject(new SQLError('¡Ocurrió un error al intentar obtener el id del usuario!'));
          }
        })
      }
    });
  });
}

module.exports = saveUser;