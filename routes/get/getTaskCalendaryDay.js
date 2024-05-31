const responseModel = [
  {
    id: 'task_id',
    title: 'task_title',
    priotity: {
      name: 'priority_name',
      weight: 'priority_weight'
    },
    status: 'task_status'
  }
];

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// funciones
const formatToModel = require('../../helpers/formatToModel');
const getTaskCalendaryDayData = require('./functions/getTaskInfo/getTaskCalendaryDayData');

const route = new Route('/get-tasks-calendar-day', async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user_id;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(date)){
      throw new ValidationError('Fecha inválida');
    }

    const tasks = await getTaskCalendaryDayData(userId, date);
    const total = await db.total('tasks', `where user_id = ${userId} and run_date = '${date}'`)-2;
    if(!tasks.length){
      return res.status(200).json({ message: 'Ninguna tarea encontrada', tasks: [], total: 0 });
    } else {
      const formatedTasks = formatToModel(tasks, responseModel);
      return res.status(200).json({ tasks: formatedTasks, total });
    }
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    } else if(err instanceof SQLError){
      return res.status(500).json({ message: 'Error en la base de datos' });
    } else {
      console.log(err);
      return res.status(500).json({ message: 'Error interno' });
    }
  }
});

module.exports = route;