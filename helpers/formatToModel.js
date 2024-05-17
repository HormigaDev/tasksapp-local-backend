const ValidationError = require('../classes/ValidationError');

/**
 * 
 * @param {object} data - Datos a formatear
 * @param {object} model - Modelo a seguir
 * @returns {object}
 */
function formatToModel(data, model) {
  if (!data || !model) throw new ValidationError('No se han proporcionado los datos necesarios para formatearlo conforme el modelo');
  if (typeof data !== 'object') throw new ValidationError('Los datos deben ser un objeto');
  if (typeof model !== 'object') throw new ValidationError('El modelo debe ser un objeto');
  
  let formattedData = {};
  if(Array.isArray(model) && model.length === 1 && typeof model[0] === 'object' && !Array.isArray(model[0])){
    formattedData = data.map(item => formatToModel(item, model[0]));
  } else {
    for (const key of Object.keys(model)) {
      if (Array.isArray(model[key])){
        if(!data.hasOwnProperty(key)) throw new ValidationError(`El campo '${key}' no ha sido proporcionado`);
        formattedData[key] = data[key].map(item => formatToModel(item, model[key][0]));
      } else if (typeof model[key] === 'string') {
        if (!data.hasOwnProperty(model[key])) throw new ValidationError(`El campo '${model[key]}' no ha sido proporcionado`);
        formattedData[key] = data[model[key]];
      } else if (typeof model[key] === 'object' && !Array.isArray(model[key])) {
        formattedData[key] = formatToModel(data, model[key]);
      } else {
        throw new ValidationError(`El campo '${key}' no tiene un tipo de dato válido`);
      }
    }
  }
  return formattedData;
}


module.exports = formatToModel;