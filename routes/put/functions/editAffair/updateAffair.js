const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {string} key - Clave a actualizar
 * @param {any} value - Valor a actualizar
 * @param {number} affairId - Id del asunto
 * @returns {Promise<any>}
 */
function updateAffair(key, value, affairId){
  const sql = db.read('update/affair', 'actualize_affair_'+key);
  return new Promise((resolve, reject) => {
    db.get(`select ${key.replace('timeline_', '')} from ${key.startsWith('timeline') ?'timelines':'affairs'} where id = ?`,[affairId],(error, prevData) => {
      if(error){
        console.log(error);
        reject(new SQLError("Hubo un error al obtener los datos previos del asunto"));
      } else {
        db.run(sql, [value, affairId], (err) => {
          if(err){
            console.log(err);
            reject(new SQLError(`¡Error al intentar actualizar la propiedad '${key}' del asunto!`));
          } else {
            resolve(prevData ? prevData[key.replace('timeline_', '')] : undefined);
          }
        });
      }
    })
  });
}

module.exports = updateAffair;