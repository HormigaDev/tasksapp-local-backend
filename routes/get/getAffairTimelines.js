const responseModel = [
  {
    id: 'timeline_id',
    title: 'timeline_title',
    description: 'timeline_description',
    createdAt: 'timeline_created_at',
    lastUpdate: 'timeline_last_update'
  }
];

const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');

// funciones
const formatToModel = require('../../helpers/formatToModel');
const getAffairTimelinesData = require('./functions/getAffairInfo/getAffairTimelinesData');
const existsAffair = require('../put/functions/editAffair/existsAffair');

const route = new Route('/get-affair-timelines', async(req, res) => {
  try {
    const affairId = Number(req.query.affair_id);
    const userId = req.user_id;
    if(Number.isInteger(affairId)) throw new ValidationError('El ID del asunto es inválido');
    if(!await existsAffair(affairId, userId)) throw new ValidationError(`El asunto '${affairId}' no existe!`);

    let timelines = await getAffairTimelinesData(affairId);
    if(timelines.length){
      return res.status(200).json({timelines: formatToModel(timelines, responseModel)});
    } else {
      return res.status(404).json({ message: 'Ninguna línea de tiempo encontrada', code: 'not_found' });
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