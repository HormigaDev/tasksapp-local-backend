const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newAffair - Objeto que contiene los datos del asunto.
 * @returns {Promise<number>}
 */
function saveAffair(newAffair){
  const sql = db.read('insert', 'new_affair');
  return new Promise((resolve, reject) => {
    db.run(sql, newAffair.toArray(), async (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Error al guardar el asunto!'));
      } else {
        resolve(await db.last_rowid());
      }
    })
  });
}

module.exports = saveAffair;