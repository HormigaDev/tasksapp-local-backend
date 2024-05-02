class ValidationError extends Error {
  constructor(message){
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * 
 * @param {object} model El modelo a validar
 * @param {object} schema El esquema a seguir
 * @returns {boolean} true si el modelo es válido, false si no
 */
function validateModel(model, schema){
  if(!model || !schema) throw new ValidationError('El modelo y el esquema son requeridos');
  if(typeof model !== 'object' || Array.isArray(model)) throw new ValidationError('El modelo debe ser un objeto');
  if(typeof schema !== 'object' || Array.isArray(schema)) throw new ValidationError('El esquema debe ser un objeto');
  for(const key in schema){
    if(!model[key]) throw new ValidationError(`La propiedad "${key}" no existe en el objeto informado.`)
    const obj = schema[key];
    if(obj.type){
      if(Array.isArray(obj.type)){
        const type = obj.type[0];
        if(!Array.isArray(model[key])) throw new ValidationError(`La propiedad "${key}" debe ser un array de tipo ${type.name}`)
        for(const item of model[key]){
          if(!(item instanceof type)) throw new ValidationError(`Se encontró un elemento en "${key}" que no es de tipo ${type.name}. Tipo: ${typeof item} Valor: ${item}`)
        }
      } else {
        if(!(model[key] instanceof obj.type)) throw new ValidationError(`La propiedad "${key}" debe ser de tipo ${obj.type.name}. Tipo informado: ${typeof model[key]} Valor: ${model[key]}`)
      }
    }
    if(obj.limit){
      if(Array.isArray(obj.limit)){
        if(model[key].length < obj.limit[0]) throw new ValidationError(`El mínimo de caracteres para la propiedad "${key}" es ${obj.limit[0]}.`);
        if(model[key].length > obj.limit[1]) throw new ValidationError(`El máximo de caracteres para la propiedad "${key}" es ${obj.limit[1]}.`);
      }
      if(typeof obj.limit === 'number'){
        if(model[key].length > obj.limit) throw new ValidationError(`El máximo de caracteres para la propiedad "${key}" es ${obj.limit}.`);
      }
    }
    if(obj.rules){
      for(const rule of obj.rules){
        if(rule?.name && rule?.rule){
          if(!rule.rule(model[key])) throw new ValidationError(`La propiedad "${key}" falló en la regla "${rule.name}"`);
        } else {
          if(!rule(model[key])) throw new ValidationError(`La propiedad "${key}" falló en una o más reglas.`);
        }
      }
    }
  }
  return true;
}

module.exports = {validateModel, ValidationError};