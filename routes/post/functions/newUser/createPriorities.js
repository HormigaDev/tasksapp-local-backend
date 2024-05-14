const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * Crea las prioridades para las tareas del usuario
 * @param {number} userId - El id del usuario
 * @returns {Promise<boolean>}
 */
function createPriorities(userId){
  const sql = db.read('insert', 'create_priority');
  const values = [
    ['low', 1],
    ['normal', 2],
    ['high', 3],
    ['urgent', 4]
  ]
  return new Promise((resolve, reject) => {
    for(const value of values){
      db.run(sql, [value[0], value[1], userId], (err) => {
        if(err){
          console.log(err);
          reject(new SQLError('¡Error al crear las prioridades!'));
        }
      })
    }
    resolve(true);
  });
}

module.exports = createPriorities;