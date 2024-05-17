const responseModel = [
  {
    id: 'affair_id',
    title: 'affair_title',
    personName: 'affair_person_name',
    createdAt: 'affair_created_at',
    lastUpdate: 'affair_last_update'
  }
];

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');

// esquemas
const requestSchema = require('../../schemas/read/GetAffairs');

// funciones
const formatToModel = require('../../helpers/formatToModel');
const validateModel = require('../../helpers/validateModel');
const getAffairsData = require('./functions/getAffairInfo/getAffairsData');

const route = new Route('/get-affairs', async(req, res) => {
  try {
    let { search='', page, limit, archiveds, order_by, asc_desc } = req.query;
    page = Number(page) || 0;
    limit = Number(limit) || 10;
    archiveds = Boolean(archiveds);
    
    const total = await db.total('affairs', `where user_id = ${req.user_id}`);
    if(!total){
      return res.status(404).json({ message: 'Ningún asunto encontrado', code: 'not_found' });
    } else {
      const totalPages = Math.ceil(total / limit) - 1;
      if(page > totalPages){
        return res.status(404).json({ message: 'La página solicitada no existe', code: 'invalid_page' });
      }
    }
    
    const model = { search, page, limit, archiveds, order_by, asc_desc };
    if(validateModel(model, requestSchema)){
      let affairs = await getAffairsData(req.user_id, search, page, limit, archiveds, order_by, asc_desc);
      if(affairs.length){
        return res.status(200).json({affairs: formatToModel(affairs, responseModel), total});
      } else {
        return res.status(404).json({ message: 'Ningún asunto encontrado', code: 'not_found' });
      }
    }

  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    } else if(err instanceof SQLError){
      return res.status(500).json({ message: 'Error en la base de datos', code: 'internal_error' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor', code: 'internal_error' });
    }
  }
});

module.exports = route;