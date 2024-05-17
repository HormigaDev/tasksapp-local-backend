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

// funciones
const formatToModel = require('../../helpers/formatToModel');
const getFixedTasksData = require('./functions/getTaskInfo/getFixedTasksData');
const getTaskCategories = require('./functions/getTaskInfo/getTaskCategories');

const route = new Route('/get-fixed-tasks', async(req, res) => {
  try {
    const userId = req.user_id;
    let tasks = await getFixedTasksData(userId);
    for(const i in tasks){
      tasks[i].categories = await getTaskCategories(tasks[i].task_id);
    }
    tasks = formatToModel(tasks, responseModel);
    return res.status(200).json({tasks});
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    } else if(err instanceof SQLError){
      return res.status(500).json({ message: err.message });
    } else {
      console.log(err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

module.exports = route;