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
    let { page, limit, search='', categories, priority, order_by, asc_desc, fixed, show_archives, show_endeds } = req.query;
    fixed = Number(fixed) === 1;
    show_archives = Number(show_archives) === 1;
    show_endeds = Number(show_endeds) === 1;
    try {
      categories = categories.split(",").map(Number);
    } catch(err){
      categories = [0];
      return res.status(400).json({ message: 'El parámetro "categories" debe ser un arreglo de números' });
    }
    if(!categories.length) categories = [0];
    page = Number(page)-1 || 0;
    if(page < 0) page = 0;
    limit = Number(limit) || 10;
    priority = Number(priority) || 0;
    const searchCondition = search ? `and (lower(t.title) like '%' || lower('${search}') || '%' or lower(t.description) like '%' || lower('${search}') || '%')`:'';

    const totalTasks = await db.total('tasks', `where t.user_id = ${req.user_id} ${show_archives ? '':`and status != 'archived'`} ${show_endeds ? '':`and status != 'ended'`}
      ${priority === 0 ? '':`and p.weight = ${priority}`} ${searchCondition}
    `, [priority === 0 ? '':`left join priorities p on p.weight = ${priority} and p.user_id = ${req.user_id} and p.id = t.priority_id`]);
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
      let tasks = await getTasks(req.user_id, search, page, limit, order_by, asc_desc, show_archives, show_endeds, priority);
      if(!tasks){
        return res.status(404).json({ message: "No se encontraron tareas con los parámetros especificados" });
      }
      for(let i in tasks){
        tasks[i].task_fixed = tasks[i].task_fixed === 1;
        tasks[i].categories = await getTaskCategories(tasks[i].task_id);
        if(!tasks[i].categories){
          tasks[i] = undefined;
          continue;
        }
        if(!categories.includes(0)){
          let hasCategories = false;
          for (const ctg of categories){
            if(tasks[i].categories.find(c => c.category_id === ctg)){
              hasCategories = true;
              break;
            }
          }
          if(!hasCategories){
            tasks[i] = undefined;
            continue
          }
        }
        if(priority !== 0){
          if(tasks[i].priority_weight !== priority){
            tasks[i] = undefined;
            continue;
          }
        }
        if(fixed){
          if(!tasks[i].task_fixed){
            tasks[i] = undefined;
            continue;
          }
        }
      }
      tasks = tasks.filter(t => t !== undefined);
      const tasksFormatted = formatToModel(tasks, responseModel);
        res.status(200).json({tasks: tasksFormatted, total: totalTasks});
      }
  } catch(err){
    if(err instanceof ValidationError || err instanceof SQLError){
      return res.status(400).json({message: err.message});
    }
    console.log(err);
    res.status(500).json({message: 'Hubo un error al intentar obtener los datos de la tarea'});
  }
});

module.exports = route;