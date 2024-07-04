const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');
const ValidationError = require('../../../../classes/ValidationError');
const permissionTemplates = require('../../../../classes/permissionTemplates');

/**
 * 
 * @param {number} userId - El id del usuario al que se le referenciarán los permisos
 * @param {string} permissionsTemplateName - El tipo de plantilla de permisos que se le asignará al usuario
 * @returns {Promise<boolean>}
 */
function referenceUserPermissions(userId, permissionsTemplateName='user'){
  if(typeof permissionsTemplateName !== 'string') throw new ValidationError('El tipo de plantilla de permisos debe ser un string.');
  if(typeof userId !== 'number') throw new ValidationError('El id del usuario debe ser un número.');
  if(!Number.isInteger(userId)) throw new ValidationError('El id del usuario debe ser un número entero.');
  if(userId < 1) throw new ValidationError('El id del usuario debe ser mayor a 0.');
  if(!['user', 'admin'].includes(permissionsTemplateName.toLowerCase())) throw new ValidationError('El tipo de plantilla de permisos no es válido.');
  const permissions = new permissionTemplates(permissionsTemplateName).mount();
  return new Promise((resolve, reject) => {
    for(const permission of permissions){
      const sql = db.read('insert', 'reference_user_permission', { permission, userId });
      db.run(sql, [], (err) => {
        if(err){
          console.log(err);
          reject(new SQLError('Ocurrió un error al referenciar los permisos del usuario.'));
        } else {
          return;
        }
      })
    }
    resolve(true);
  })
}

module.exports = referenceUserPermissions;