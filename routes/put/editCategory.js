const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// esquemas
const categoryScheme = require('../../schemas/actualize/Category');

// funciones
const validateProp = require('../../helpers/validateProp');
const existsCategory = require('./functions/editCategory/existsCategory');
const updateCategory = require('./functions/editCategory/updateCategory');
const checkProp = require('./functions/editCategory/checkProp');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/edit-category', async (req, res) => {
  try {
    const r = req.body;
    const id = Number(r.category_id);
    const category = {
      name: r.name,
      color: r.color,
      icon: r.icon
    };
    if(!await existsCategory(id, req.user_id)) throw new ValidationError(`La categoría con id '${id}' no existe.`);
    await db.commit();
    db.serialize(async () => {
      try {
        const categoryDetails = {
          category_id: id,
          name: [],
          color: [],
          icon: []
        }
        await db.begin();
        for(const key of Object.keys(category)){
          const value = category[key];
          if(!value){
            if(value !== 0) continue;
          }
          if(validateProp(key, value, categoryScheme)){
            if(await checkProp(key, value, id)) continue;
            const prevData = await updateCategory(key, value, id);
            if(prevData !== undefined){
              categoryDetails[key] = [prevData, value];
            }
          } 
        }
        for(const key of Object.keys(categoryDetails).slice(1)){
          if(categoryDetails[key].length === 0) delete categoryDetails[key];
        }
        await registerLog(req.user_id, 'update', 'categories', categoryDetails.toSnakeCase());
        await db.commit();
        res.status(200).json({ message: '¡Categoría actualizada correctamente!' });
      } catch(err){
        await db.rollback();
        if(err instanceof SQLError) return res.status(500).json({ message: err.message });
        if(err instanceof ValidationError) return res.status(400).json({ message: err.message });
        console.log(err);
        return res.status(500).json({ message: '¡Ha ocurrido un error al intentar actualizar la categoría!' });
      }
    });
  } catch(err){
    if(err instanceof ValidationError) return res.status(400).json({ message: err.message });
    console.log(err);
    return res.status(500).json({ message: '¡Ha ocurrido un error al intentar actualizar la categoría!' });
  }
});

module.exports = route;