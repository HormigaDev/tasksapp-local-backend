const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newTimeline - Objeto que contiene los datos de la línea de tiempo del asunto.
 * @returns {Promise<boolean>}
 */
function saveAffairTimeline(newTimeline){
  const sql = db.read('insert', 'new_affair_timeline');
  return new Promise((resolve, reject) => {
    db.run(sql, newTimeline.toArray(), async (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('¡Error al guardar línea de tiempo del asunto!'));
      } else {
        const id = await db.last_rowid()
        resolve(id);
      }
    })
  });
}

module.exports = saveAffairTimeline;