const ValidationError = require('../classes/ValidationError');

/**
 * 
 * @param {string} key - Clave a validar
 * @param {any} value - Valor a validar
 * @param {object} schema - Esquema de validación
 * @returns {boolean}
 */
function validateProp(key, value, schema){
  if(!key || (!value && value !== 0) || !schema) throw new ValidationError('¡Error al validar clave o valor! Clave, valor o esquema no definidos.');
  if(typeof key !== 'string') throw new ValidationError('¡Error al validar clave! La clave debe ser un string.');
  if(!schema[key]) throw new ValidationError(`¡Error al validar clave! La propiedad '${key}' no existe en el esquema.`);
  const sch = schema[key];
  if(sch.type){
    if(Array.isArray(sch.type)){
      if(!Array.isArray(value)) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe ser un array.`);
      const type = sch.type[0];
      for(const v of value){
        if(typeof v !== type) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe ser un array de tipo ${type}. Se encontró el valor ${v} de tipo ${typeof v}.`);
      }
    } else {
      if(typeof value !== sch.type) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe ser de tipo ${sch.type}. Tipo informado: ${typeof value} Valor: ${value}`);
    }
  }
  if(sch.limit){
    if(Array.isArray(sch.limit)){
      switch(typeof value){
        case 'string':
          if(value.length < sch.limit[0] || value.length > sch.limit[1]) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe tener entre ${sch.limit[0]} y ${sch.limit[1]} caracteres. Se encontraron ${value.length} caracteres.`);
          break;
        case 'number':
          if(value < sch.limit[0] || value > sch.limit[1]) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe tener un valor entre ${sch.limit[0]} y ${sch.limit[1]}. Se encontró el valor ${value}.`);
          break;
        case 'object':
          if(value.length < sch.limit[0] || value.length > sch.limit[1] && Array.isArray(value)) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe tener entre ${sch.limit[0]} y ${sch.limit[1]} elementos. Se encontraron ${value.length} elementos.`);
          break;
        default:  
          throw new ValidationError(`¡Error al validar valor! No se puede aplicar limit a un valor de tipo ${typeof value}.`);
      }
    } else {
      switch(typeof value){
        case 'string':
          if(value.length > sch.limit) throw new ValidationError(`¡El límite de caracteres para la propiedad '${key}' es de ${sch.limit}. Se encontraron ${value.length} caracteres.`);
          break;
        case 'number':
          if(value > sch.limit) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe tener un valor menor o igual a ${sch.limit}. Se encontró el valor ${value}.`);
          break;
        case 'object':
          if(value.length > sch.limit && Array.isArray(value)) throw new ValidationError(`¡Error al validar valor! La propiedad '${key}' debe tener un máximo de ${sch.limit} elementos. Se encontraron ${value.length} elementos.`);
          break;
        default:  
          throw new ValidationError(`¡Error al validar valor! No se puede aplicar limit a un valor de tipo ${typeof value}.`);
      }
    }
  }
  if(sch.rules){
    for(const rule of sch.rules){
      if(rule.name && rule.rule){
        if(!rule.rule(value)) throw new ValidationError(`La propiedad '${key}' no cumple con la regla '${rule.name}'.`);
      } else{
        if(!rule(value)) throw new ValidationError(`La propiedad '${key}' no cumple con una de las reglas definidas.`);
      }
    }
  }
  return true;
}

module.exports = validateProp;