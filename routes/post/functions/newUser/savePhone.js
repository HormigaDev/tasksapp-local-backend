const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {object} newPhone - El objeto que contiene los datos del nuevo teléfono 
 * @returns {Promise<number>} - Retorna el id del teléfono creado
 */
function savePhone(newPhone){
  return new Promise((resolve, reject) => {
    const newPhoneQuery = db.read('insert', 'new_phone');
    const getPhoneQuery = db.read('select', 'get_phone');
    db.run(newPhoneQuery, newPhone.toArray(), (err) => {
      if(err){
        console.error(err);
        reject(new SQLError('¡Ocurrió un error al intentar guardar los datos del teléfono!'));
      }
      const np = newPhone;
      db.get(getPhoneQuery, [np.ddd, np.ph_number, np.ph_type], (err, row) => {
        if(err){
          console.error(err);
          reject(new SQLError('¡Ocurrió un error al intentar obtener el id del teléfono!'));
        }
        if(row){
          resolve(row.id);
        } else {
          reject(new SQLError('¡Ocurrió un error al intentar obtener el id del teléfono!'));
        }
      })
    });
  });
}

module.exports = savePhone;