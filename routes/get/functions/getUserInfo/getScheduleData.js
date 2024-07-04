const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

function getScheduleData(name, userId){
  const sql = db.read('select', 'schedule');
  return new Promise((resolve, reject) => {
    db.get(sql, [name, userId], (err, row) => {
      if(err){
        console.log(err);
        reject(new SQLError('Ocurrió un error al obtener el horario.'));
      } else {
        resolve(row);
      }
    })
  });
}

module.exports = getScheduleData;