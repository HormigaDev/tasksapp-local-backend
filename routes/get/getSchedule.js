const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

const getScheduleData = require('./functions/getUserInfo/getScheduleData');

const route = new Route('/get-schedule', async (req, res) => {
  try {
    const priorities = ['urgent', 'high', 'normal', 'low']
    const userId = req.user_id;
    let priority = req.query.priority;
    if(typeof priority === 'string'){
      priority = priority.toLowerCase();
    }
    if(!priorities.includes(priority)){
      throw new ValidationError('La prioridad no es válida.');
    }
    const schedule = await getScheduleData(priority, userId);
    if(schedule === undefined){
      return res.status(404).json({ message: 'No se encontró el horario.' });
    }
    return res.status(200).json({schedule});
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    } else {
      console.log(err);
      return res.status(500).json({ message: 'Ocurrió un error al obtener el horario.' });
    }
  }
});

module.exports = route;