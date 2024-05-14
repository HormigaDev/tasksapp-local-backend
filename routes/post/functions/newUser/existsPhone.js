const db = require('../../../../database');

/**
 * 
 * @param {string} ddd - Código de área del teléfono 
 * @param {string} ph_number - Número de teléfono
 * @param {string} ph_type - Tipo de teléfono
 * @returns {Promise<boolean> | Promise<number>} - Retorna false si el teléfono no existe en la base de datos, de lo contrario retorna el id del teléfono
 */
function existsPhone(ddd, ph_number, ph_type){
  return new Promise((resolve, reject) => {
    const sql = db.read('select', 'get_phone');
    db.get(sql, [ddd, ph_number, ph_type], (err, row) => {
      if(err){
        console.error(err);
        reject(err);
      }
      resolve(row !== undefined ? row.id : false);
    });
  });
}

module.exports = existsPhone;