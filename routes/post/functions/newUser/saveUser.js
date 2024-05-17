const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newUser  - El objeto que contiene los datos del nuevo usuario 
 * @returns {Promise<number>} - Retorna el id del usuario creado
 */
function saveUser(newUser){
  const newUserQuery = db.read('insert', 'new_user');
  return new Promise((resolve, reject) => {
    db.run(newUserQuery, newUser.toArray(), async (err) => {
      if(err){
        console.error(err);
        reject(new SQLError('¡Ocurrió un error al intentar guardar los datos del usuario!'));
      } else {
        const id = await db.last_rowid();
        resolve(id);
      }
    });
  });
}

module.exports = saveUser;