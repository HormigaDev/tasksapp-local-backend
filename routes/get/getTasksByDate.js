const responseModel = [
  {
    id: 'task_id',
    title: 'task_title',
    priority: {
      name: 'priority_name',
      weight: 'priority_weight'
    },
    categories: [
      {
        id: 'category_id',
        name: 'category_name',
        color: 'category_color',
        icon: 'category_icon'
      }
    ]
  }
];

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// funciones
const formatToModel = require('../../helpers/formatToModel');
const getTasksByDateData = require('./functions/getTaskInfo/getTasksByDateData');
const getTasksCategories = require('./functions/getTaskInfo/getTaskCategories');

const route = new Route('/get-tasks-by-date', async(req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user_id;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(date)){
      throw new ValidationError('Fecha inválida');
    }
    const queries = db.read('select', 'tasks_by_date').split(";");
    const tasks = await getTasksByDateData(userId, date, queries[0]);
    for (const i in tasks){
      const categories = await getTasksCategories(tasks[i].task_id);
      tasks[i].categories = categories;
    }
    if(!tasks.length){
      return res.status(404).json({ message: 'Ninguna tarea encontrada' });
    } else {
      const formatedTasks = formatToModel(tasks, responseModel);
      return res.status(200).json({tasks: formatedTasks});
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