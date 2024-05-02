const Route = require('../Route');

const route = new Route('/new-user', async (req, res) => {
  const newUser = {
    username,
    password,
    email,
    type,
    status,
    created_at,
    last_update,
    last_session,
    avatar_url
  } = req.body;

  const newPhone = {
    ddd,
    ph_number,
    type
  } = req.body;

  const user = require('../../schemas/User');
  const phone = require('../../schemas/Phone');
  if(route.validateModel(newUser, user) && route.validateModel(newPhone, phone)){
    newUser.password = route.hashPassword(newUser.password);
    await route.db.run(route.db.read('insert', 'new_user'),
    [
      ...newUser.toArray(),
      ...newPhone.toArray(),
      newUser.email, newPhone.ddd, newPhone.ph_number
    ], (err) => {
      if(err){
        console.error(err);
        route.db.rollback();
        res.status(500);
        res.json({ message: '¡Error al crear usuario!'});
      }
      res.json({ message: '¡Usuario creado!'});
    });
  }
});

module.exports = route;