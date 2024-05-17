const responseModel = {
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

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');

// funciones
const existsTask = require('./functions/getTaskInfo/existsTask');
const getTaskData = require('./functions/getTaskInfo/getTaskData');
const getTaskCategories = require('./functions/getTaskInfo/getTaskCategories');
const formatToModel = require('../../helpers/formatToModel');

const route = new Route('/get-task', async(req, res) => {
  try {
    const taskId = Number(req.query.task_id);
    if(!await existsTask(taskId, req.user_id)){
      throw new ValidationError('La tarea que intentas obtener no existe');
    }
    const taskData = await getTaskData(taskId);
    taskData.fixed = taskData.fixed === 1;
    taskData.categories = await getTaskCategories(taskId);
    const task = formatToModel(taskData, responseModel);
    res.status(200).json({task});
  } catch(err){
    if(err instanceof ValidationError || err instanceof SQLError){
      return res.status(400).json({error: err.message});
    }
    console.log(err);
    res.status(500).json({error: 'Hubo un error al intentar obtener los datos de la tarea'});
  }
});

module.exports = route;