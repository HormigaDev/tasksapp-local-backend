const db = require('../database');
const SQLError = require('../classes/SQLError');
const ValidationError = require('../classes/ValidationError');

/**
 * 
 * @param {number} userId - El id del usuario que realizó la acción
 * @param {string} actionType - El tipo de acción que realizó el usuario (insert, update, delete)
 * @param {string} dataType - El tipo de dato que se manipuló (user, schedule, etc)
 * @param {object} details - Detalles de la acción realizada por el usuario (JSON)
 * @returns {Promise<boolean>}
 */
function registerLog(userId, actionType, dataType, details={}){
  if(!userId) throw new ValidationError('El id del usuario es requerido.');
  if(!actionType) throw new ValidationError('El tipo de acción es requerido.');
  if(!dataType) throw new ValidationError('El tipo de dato es requerido.');
  if(typeof userId !== 'number') throw new ValidationError('El id del usuario debe ser un número.');
  if(typeof actionType !== 'string') throw new ValidationError('El tipo de acción debe ser un string.');
  if(typeof dataType !== 'string') throw new ValidationError('El tipo de dato debe ser un string.');
  if(typeof details !== 'object') throw new ValidationError('Los detalles deben ser un objeto.');
  if(actionType.length < 1 || actionType.length > 50) throw new ValidationError('El tipo de acción debe tener entre 1 y 50 caracteres.');
  if(dataType.length < 1 || dataType.length > 50) throw new ValidationError('El tipo de dato debe tener entre 1 y 50 caracteres.');
  if(!Number.isInteger(userId)) throw new ValidationError('El id del usuario debe ser un número entero.');
  if(userId < 1) throw new ValidationError('El id del usuario debe ser mayor a 0.');
  const sql = db.read('insert', 'user_log');
  return new Promise((resolve, reject) => {
    db.run(sql, [userId, actionType, dataType, JSON.stringify(details)], (err) => {
      if(err){
        console.log(err);
        reject(new SQLError('Ocurrió un error al registrar el log.'));
      } else {
        resolve(true);
      }
    })
  })
}

module.exports = registerLog;