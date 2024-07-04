const Route = require('../Route');
const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const db = require('../../database');
const configs = require('../../configs');

const ignoreGroupedNotifications = require('./functions/editTask/ignoreGroupedNotifications');
const ignoreNotification = require('./functions/editTask/ignoreNotification');

const route = new Route('/ignore-notification', async (req, res) => {
  try {
    const userId = req.user_id;
    const groupNotifications = configs.get('groupNotifications');
    const notificationId = req.body.notification_id;
    const priorityName = req.body.priority_name;
    if(!notificationId && !groupNotifications) throw new ValidationError('Falta el id de la notificación');
    if(isNaN(parseInt(notificationId)) && !groupNotifications) throw new ValidationError('El id de la notificación no es válido. Debe ser un número entero');
    
    if(groupNotifications && !priorityName) throw new ValidationError('Falta el nombre de la prioridad');
    if(!['urgent', 'high', 'normal', 'low'].includes(priorityName) && groupNotifications) throw new ValidationError('La prioridad no es válida. Debe ser "urgent", "high", "normal" o "low"');
    
    await db.commit();
    db.serialize(async () => {
      try {
        await db.begin();
        if(groupNotifications){
          await ignoreGroupedNotifications(userId, priorityName);
          await db.commit();
          res.status(200).json({ message: 'Notificaciones ignoradas correctamente' });
        } else {
          await ignoreNotification(userId, notificationId);
          await db.commit();
          res.status(200).json({ message: 'Notificación ignorada correctamente' });
        }

      } catch(err){
        if(err instanceof SQLError){
          await db.rollback();
          res.status(500).json({ message: err.message });
        } else {
          console.log(err);
          await db.rollback();
          res.status(500).json({ message: 'Error interno del servidor' });
        }
      }
    })

  } catch(err){
    if(err instanceof ValidationError){
      res.status(400).json({ message: err.message });
    } else {
      console.log(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

module.exports = route;