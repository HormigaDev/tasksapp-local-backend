const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');

const getUserStats = require('./functions/getUserInfo/getUserStats');
const getTaskStats = require('./functions/getTaskInfo/getTaskStats');
const getAffairStats = require('./functions/getAffairInfo/getAffairStats');

const route = new Route('/user-stats', async (req, res) => {
  try {
    const userId = req.user_id;
    const { dateStart, dateEnd } = req.query;
    if(!dateStart || !dateEnd){
      throw new ValidationError("Faltan parámetros");
    }
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegex.test(dateStart) || !dateRegex.test(dateEnd)){
      throw new ValidationError("Formato de fecha inválido");
    }
    const stats = await getUserStats(userId, dateStart, dateEnd);
    const taskStats = await getTaskStats(userId, dateStart, dateEnd);
    const affairStats = await getAffairStats(userId, dateStart, dateEnd);
    res.status(200).json({ stats: stats, taskStats, affairStats})
  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    } else if(err instanceof SQLError){
      return res.status(500).json({ message: err.message });
    } else {
      console.log(err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

module.exports = route;