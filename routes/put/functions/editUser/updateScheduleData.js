const  db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} userId - El id del usuario
 * @param {number} weight - El peso del horario
 * @param {string} timeStart - La hora de inicio
 * @param {string} timeEnd - La hora de fin
 * @param {Array<number>} weekdays - Los días de la semana
 * @param {number} minutes - Los minutos
 * @param {number} hours - Las horas
 * @param {number} days - Los días
 * @returns {Promise<boolean>}
 */
function updateScheduleData(userId, weight, timeStart, timeEnd, weekdays, minutes, hours, days){
  const sql = db.read('update', 'schedule', { timeStart, timeEnd,
    mon: weekdays.includes('mon') ? 1:0,
    tues: weekdays.includes('tues') ? 1:0,
    wednes: weekdays.includes('wednes') ? 1:0,
    thurs: weekdays.includes('thurs') ? 1:0,
    fri: weekdays.includes('fri') ? 1:0,
    satur: weekdays.includes('satur') ? 1:0,
    sun: weekdays.includes('sun') ? 1:0,
   });
  return new Promise((resolve, reject) => {
    db.run(sql, [minutes, hours, days, userId, weight], (err) => {
      if(err){
        console.log(err)
        reject(new SQLError('Ocurrió un error al actualizar el horario.'));
      } else {
        resolve(true);
      }
    })
  });
}

module.exports = updateScheduleData;