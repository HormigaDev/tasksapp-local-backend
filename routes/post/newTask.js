const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// Esquemas
const taskSchema = require('../../schemas/write/Task');

// funciones
const existsCategory = require('./functions/newTask/existsCategory');
const saveTask = require('./functions/newTask/saveTask');
const relationTaskCategory = require('./functions/newTask/relationTaskCategory');
const saveNotification = require('./functions/newTask/saveNotification');
const validateModel = require('../../helpers/validateModel');

const route = new Route('/new-task', async (req, res) => {
  try {
    const r = req.body;
    const user_id = req.user_id;
    const nt = {
      title: r.title,
      description: r.description,
      run_date: r.run_date,
      priority_id: Number(r.priority_id)
    }; // Objeto que contiene los datos de la tarea
    nt.user_id = user_id;
    nt.status = 'created';
    nt.fixed = 0;
    nt.created_at = new Date().toFormat();
    nt.last_update = new Date().toFormat();
    const categories = await JSON.parse(r.categories);
    if(!Array.isArray(categories)) throw new ValidationError('¡Error al crear tarea! Las categorías deben ser un arreglo.');
    for(const c of categories){
      if(typeof c !== 'number') throw new ValidationError('¡Error al crear tarea! Las categorías deben ser números.');
      if(!await existsCategory(nt.user_id, c)) throw new ValidationError(`¡Error al crear tarea! La categoría "${c}" no existe.`);
    }
    if(validateModel(nt, taskSchema)){
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          const taskId = await saveTask(nt);
          for(const c of categories){
            await relationTaskCategory(taskId, c);
          }
          if(await saveNotification(nt.user_id, taskId)){
            await db.commit();
            return res.status(201).json({ message: '¡Tarea creada correctamente!' });
          }
        } catch(err){
          console.log(err);
          await db.rollback();
          if(err instanceof SQLError){
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: '¡Error al crear tarea! Error interno.' });
          }
        }
      });
    }
  } catch(error){
    if(error instanceof ValidationError){
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: '¡Error al crear tarea! Error interno.'});
    }
  }
});

module.exports = route;