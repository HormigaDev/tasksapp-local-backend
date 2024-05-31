const responseModel = [
  {
    id: 'task_id',
    title: 'task_title',
    description: 'task_description',
    status: 'task_status',
    priority: {
      name: 'priority_name',
      weight: 'priority_weight'
    },
    fixed: 'task_fixed',
    createdAt: 'task_created_at',
    lastUpdate: 'task_last_update',
    runDate: 'task_run_date',
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
const getTasksByMonthData = require('./functions/getTaskInfo/getTasksByMonthData');
const getTaskCategories = require('./functions/getTaskInfo/getTaskCategories');

const route = new Route('/get-tasks-by-month', async(req, res) => {
  try {
    let { month, year } = req.query;
    month = Number(month);
    year = Number(year);
    const userId = req.user_id;
    if(!month || !year){
      throw new ValidationError('Mes y año son requeridos');
    }
    if(year < 1900) throw new ValidationError('Año inválido');
    if(month < 1 || month > 12) throw new ValidationError('Mes inválido');
    const tasks = await getTasksByMonthData(userId, month, year);

    for (const i in tasks){
      const categories = await getTaskCategories(tasks[i].task_id);
      tasks[i].categories = categories;
    }
    if(!tasks.length){
      return res.status(200).json({ tasks: [] });
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