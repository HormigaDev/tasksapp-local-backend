const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// esquemas
const taskScheme = require('../../schemas/actualize/Task');

// funciones
const validateProp = require('../../helpers/validateProp');
const existsTask = require('./functions/editTask/existsTask');
const updateTask = require('./functions/editTask/updateTask');
const taskHasCategory = require('./functions/editTask/taskHasCategory');
const insertCategory = require('./functions/editTask/insertCategory');
const checkProp = require('./functions/editTask/checkProp');
const registerLog = require('../../helpers/registerLog');
const removeAllCategories = require('./functions/editTask/removeAllCategories');

const route = new Route('/edit-task', async (req, res) => {
  try {
    const r = req.body;
    const taskId = Number(r.task_id);
    const task = {
      title: r.title,
      description: r.description,
      status: r.status,
      priority_id: Number(r.priority_id),
      run_date: r.run_date,
      fixed: !r.fixed ? 0 : 1
    };
    let categories = r.categories;
    if(categories){
      categories = categories.split(",").map(Number);
      if(categories.find(c => isNaN(c) && Number.isInteger(c))) throw new ValidationError('El parámetro "categories" debe ser un arreglo de números enteros');
    } 
    if(!await existsTask(taskId)) throw new ValidationError(`La tarea con id '${taskId}' no existe.`);
    await db.commit();
    db.serialize(async () => {
      try {
        const taskDetails = {
          task_id: taskId,
          title: [],
          description: [],
          status: [],
          priority_id: [],
          run_date: [],
          categories: [
            [],
            []
          ]
        }
        for(const key of Object.keys(task)){
          const value = task[key];
          if(!value){
            if(value !== 0) continue;
          }
          if(validateProp(key, value, taskScheme)){
            if(await checkProp(key, value, taskId) && key !== 'priority_id') continue;
            const prevData = await updateTask(key, value, taskId, req.user_id);
            if(prevData !== undefined){
              taskDetails[key] = [prevData, value];
            }
          } 
        }
        await updateTask('last_update', new Date().toFormat(), taskId);
        await removeAllCategories(taskId);
        for(const category of categories){
          const hasCategory = await taskHasCategory(taskId, category);
          if(hasCategory) {
            taskDetails.categories[0].push(category);
          }
          if(!hasCategory){
            await insertCategory(taskId, category);
            taskDetails.categories[1].push(category);
          }
        }
        taskDetails.categories[1] = taskDetails.categories[0].concat(taskDetails.categories[1]);
        for(const key of Object.keys(taskDetails).slice(1, 7)){
          if(taskDetails[key].length === 0) delete taskDetails[key];
        }
        if(!r.fixed){
          await registerLog(req.user_id, 'update', 'tasks', taskDetails.toSnakeCase());
        }
        await db.commit();
        res.status(200).json({ message: '¡Tarea actualizada correctamente!' });
      } catch(err){
        await db.rollback();
        if(err instanceof SQLError) return res.status(500).json({ message: err.message });
        if(err instanceof ValidationError) return res.status(400).json({ message: err.message });
        console.log(err);
        return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar la tarea!' });
      }
    });
  } catch(error){
    if(error instanceof ValidationError) return res.status(400).json({ message: error.message });
    console.log(error);
    return res.status(500).json({ message: '¡Ha ocurrido un error al intentar actualizar la tarea!' });
  }
});

module.exports = route;