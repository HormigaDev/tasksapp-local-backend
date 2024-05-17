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

// esquemas
const requestSchema = require('../../schemas/read/GetTasks');

// funciones
const formatToModel = require('../../helpers/formatToModel');
const validateModel = require('../../helpers/validateModel');
const getTasks = require('./functions/getTaskInfo/getTasks');
const getTaskCategories = require('./functions/getTaskInfo/getTaskCategories');

const route = new Route('/get-tasks', async(req, res) => {
  try {
    let { page, limit, search='', categories, priority, order_by, asc_desc } = req.query;
    categories = JSON.parse(categories);
    page = Number(page) || 0;
    limit = Number(limit) || 10;
    priority = Number(priority) || 0;

    const totalTasks = await db.total('tasks', `where user_id = ${req.user_id}`);
    if(!totalTasks){
      return res.status(404).json({ message: 'Ninguna tarea encontrada' });
    } else {
      const totalPages = Math.ceil(totalTasks / limit) - 1;
      if(page > totalPages){
        return res.status(404).json({ message: 'La página solicitada no existe' });
      }
    }

    const model = { page, limit, search, categories, priority, order_by, asc_desc };
    if(validateModel(model, requestSchema)){
      let tasks = await getTasks(req.user_id, search, page, limit, order_by, asc_desc, categories);
      if(!tasks){
        return res.status(404).json({ message: "No se encontraron tareas con los parámetros especificados" });
      }
      for(let i in tasks){
        tasks[i].fixed = tasks[i].fixed === 1;
        tasks[i].categories = await getTaskCategories(tasks[i].task_id);
      }
      const tasksFormatted = formatToModel(tasks, responseModel);
        res.status(200).json({tasks: tasksFormatted, total: totalTasks});
      }
  } catch(err){
    if(err instanceof ValidationError || err instanceof SQLError){
      return res.status(400).json({error: err.message});
    }
    console.log(err);
    res.status(500).json({error: 'Hubo un error al intentar obtener los datos de la tarea'});
  }
});

module.exports = route;