const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const configs = require('../../configs');

const getGroupedNotifications = require('./functions/getTaskInfo/getGroupedNotifications');
const getUngroupedNotifications = require('./functions/getTaskInfo/getUngroupedNotifications');

const route = new Route('/get-notifications', async (req, res) => {
  try {
    const userId = req.user_id;
    const groupNotifications = configs.get('groupNotifications');

    if(groupNotifications){
      const groupedNotifications = await getGroupedNotifications(userId);
      return res.status(200).json({ notifications: groupedNotifications??[], grouped: true });
    } else {
      const ungroupedNotifications = await getUngroupedNotifications(userId);
      return res.status(200).json({ notifications: ungroupedNotifications??[], grouped: false });
    }

  } catch(err){
    if(err instanceof ValidationError){
      res.status(400).json({ message: err.message });
    } else if(err instanceof SQLError){
      res.status(500).json({ message: err.message });
    } else {
      console.log(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

module.exports = route;