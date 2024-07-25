const db = require('../../../../database');
const SQLError = require('../../../../classes/SQLError');

/**
 * 
 * @param {number} taskId - El id de la tarea
 * @returns {Promise<boolean>}
 */
function removeAllCategories(taskId){
    const sql = db.read('delete', 'all_tasks_categories');
    return new Promise((resolve, reject) => {
        db.run(sql, [taskId], (err) => {
            if(err) reject(new SQLError(err.message));
            resolve(true);
        })
    })
}

module.exports = removeAllCategories;