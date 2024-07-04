const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

//esquemas
const categoryScheme = require('../../schemas/write/CategoryScheme');

//funciones
const existsCategory = require('./functions/newCategory/existsCategory');
const saveCategory = require('./functions/newCategory/saveCategory');
const validateModel = require('../../helpers/validateModel');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/new-category', async (req, res) => {
  try {
    const r = req.body;
    const userId = req.user_id;
    const nc = {
      name: r.name,
      color: r.color,
      icon: r.icon
    }; // newCategory - Objeto que contiene los datos de la categoría.
    if(validateModel(nc, categoryScheme)){
      await db.commit();
      db.serialize(async () => {
        try {
          await db.begin();
          let categoryId = await existsCategory(nc);
          if(!categoryId){
            nc.user_id = userId;
            categoryId = await saveCategory(nc);
          }
          await registerLog(userId, 'insert', 'categories', { category_id: categoryId });
          await db.commit();
          res.status(201).json({ message: '¡Categoría creada exitosamente!', categoryId });
        } catch(err){
          console.log(err);
          await db.rollback();
          if(err instanceof SQLError){
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: '¡Error al crear categoría! Error interno.'});
          }
        }
      });
    }
  } catch(error){
    if(error instanceof ValidationError){
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: '¡Error al crear categoría! Error interno.'});
    }
  }
});

module.exports = route;