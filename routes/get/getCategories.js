const responseModel = [
  {
    id: 'category_id',
    name: 'category_name',
    color: 'category_color',
    icon: 'category_icon'
  }
];

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');

// funciones
const getCategories = require('./functions/getCategoryInfo/getCategories');
const formatToModel = require('../../helpers/formatToModel');

const route = new Route('/get-categories', async (req, res) => {
  try {
    const categories = await getCategories(req.user_id);
    const formattedCategories = formatToModel(categories, responseModel);
    res.status(200).json({ categories: formattedCategories });
  } catch(err){
    if(err instanceof ValidationError || err instanceof SQLError){
      return res.status(400).json({error: err.message});
    }
    console.log(err);
    res.status(500).json({error: 'Hubo un error al intentar obtener las categorías'});
  }
});

module.exports = route;