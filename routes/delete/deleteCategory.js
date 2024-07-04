const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// funciones
const existsCategory = require('../put/functions/editCategory/existsCategory');
const removeCategoryData = require('./functions/deleteCategory/removeCategoryData');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/delete-category', async (req, res) => {
  try {
    const categoryId = req.query.category_id;
    if(!await existsCategory(categoryId, req.user_id)){
      throw new ValidationError('La categoría que intentas eliminar no existe');
    }
    await db.commit();
    db.serialize(async () => {
      try {
        const details = {
          userId: req.user_id,
          categoryId
        }
        const queries = db.read('delete', 'category_info').split(";");
        await db.begin();
        for(const query of queries){
          await removeCategoryData(categoryId, query);
        }
        await registerLog(req.user_id, 'delete', 'categories', details.toSnakeCase());
        await db.commit();
        res.status(200).json({message: `Categoria con ID '${categoryId}' eliminada correctamente`});
      } catch(err){
        await db.rollback();
        if(err instanceof SQLError){
          return res.status(400).json({ message: err.message });
        }
        console.log(err);
        res.status(500).json({message: 'Hubo un error al intentar eliminar la categoría'});
      }
    });
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    }
    console.log(err);
    res.status(500).json({message: 'Hubo un error al intentar eliminar la categoría'});
  }
});

module.exports = route;