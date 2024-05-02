const Route = require('../Route');

// Esquemas
const task = require('../../schemas/Task'); // Esquema de la estructura de la tarea
const taskCategories = require('../../schemas/TaskCategories'); // Esquema de la estructura de las categorías de la tarea

const route = new Route('/new-task', async (req, res) => {
  try {
    const newTask = {
      title,
      description,
      run_date,
      user_id,
      priority_id,
    } = req.body;
    newTask.status = 'created';
    newTask.fixed = 0;
    newTask.created_at = new Date().toFormat();
    newTask.last_update = new Date().toFormat();

    const categories = req.body.categories;

    
    if(route.validateModel(newTask, task)){
      await route.db.run(route.db.read('insert', 'new_task'), [newTask.toArray()], async (err) => {
        if(err){
          console.error(err);
          res.status(500).json({ message: '¡Error al crear tarea! Error interno.'});
        }
        const taskId = this.lastID;
        if(route.validateModel({categories}, taskCategories)){
          for(const category of categories){
            const exists = await route.db.get(route.db.read('select', 'task_category_exists'), [category]);
            if(!exists){
              res.status(400).json({ message: `¡Error al crear tarea! Categoría con ID = ${category} no existe.`});
              return;
            }
            await route.db.run(route.db.read('insert', 'new_task_category'), [taskId, category]);
          }
          res.json({ message: '¡Tarea creada!' });
        }
      });
    }
  } catch(error){
    if(error instanceof route.ValidationError){
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: '¡Error al crear tarea! Error interno.'});
    }
  }
});

module.exports = route;