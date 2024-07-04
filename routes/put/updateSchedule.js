const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const updateScheduleData = require('./functions/editUser/updateScheduleData');

const route = new Route('/update-schedule', async (req, res) => {
  try {
    const { weight, time_start, time_end, weekdays, minutes, hours , days } = req.body;
    const regSchedule = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    let dateTemplate = '1900-01-01 {{time}}:00';

    if(!regSchedule.test(time_start) || !regSchedule.test(time_end)){
      throw new ValidationError('El formato de la hora no es correcto.');
    }
    if(!Array.isArray(weekdays)){
      throw new ValidationError('Los días de la semana deben ser un arreglo.');
    }
    if(weekdays.length < 1 || weekdays.length > 7){
      throw new ValidationError('Los días de la semana deben tener al menos un día y máximo 7.');
    }
    if(weight < 1 || weight > 4){
      throw new ValidationError('El peso debe ser un número entre 1 y 4.');
    }
    const _days = ['mon', 'tues', 'wednes', 'thurs', 'fri', 'satur', 'sun'];
    for(const day of weekdays){
      if(!_days.includes(day)){
        throw new ValidationError('El día de la semana no es válido.');
      }
    }
    
    if(minutes < 5 || minutes > 59){
      throw new ValidationError('Los minutos deben ser un número entre 5 y 59.');
    }
    if(hours < 0 || hours > 23){
      throw new ValidationError('Las horas deben ser un número entre 0 y 23.');
    }
    if(days < 0 || days > 31){
      throw new ValidationError('Los días deben ser un número entre 0 y 31.');
    }

    await db.commit();
    db.serialize(async () => {
      try {
        await updateScheduleData(req.user_id, weight, dateTemplate.replace('{{time}}', time_start), dateTemplate.replace('{{time}}', time_end), weekdays, minutes, hours, days);
        return res.status(200).json({ message: 'Horario actualizado correctamente.' });
      } catch(err){
        if(err instanceof SQLError){
          return res.status(500).json({ message: err.message });
        } else {
          console.log(err);
          return res.status(500).json({ message: 'Ocurrió un error al actualizar el horario.' });
        }
      }
    })

  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else if (err instanceof SQLError) {
      res.status(500).json({ message: err.message });
    } else {
      console.log(err);
      res.status(500).json({ message: 'Ocurrió un error al actualizar el horario.' });
    }
  }
});

module.exports = route;