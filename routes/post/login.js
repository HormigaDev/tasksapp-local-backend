const ValidationError = require('../../classes/ValidationError');
const SQLError = require('../../classes/SQLError');
const Route = require('../Route');
const configurations = require('../../configs');
const db = require('../../database');

// esquemas
const { password: pass } = require('../../schemas/write/User');
const schema = {
  email_username: {
    type: 'string',
    limit: [3, 100],
    rules: [
      {
        name: 'Es alfanumérico o es un email',
        rule: (value) => {
          return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(value) || /^[a-zA-Z0-9]+$/.test(value);
        }
      }
    ]
  },
  password: pass,
}

// funciones
const { compare, encode } = require('../../helpers/ciphers');
const existsUser = require('./functions/newUser/existsUser');
const validateModel = require('../../helpers/validateModel');
const getUserInfo = require('./functions/login/getUserInfo');
const toTime = require('../../helpers/convertToTime');

const route = new Route('/login', async(req, res) => {
  try {
    const { email_username, password } = req.body;
    if(!password) throw new ValidationError('La contraseña es requerida. No se puede dejar vacía.');
    if(!email_username) throw new ValidationError('El email o el nombre de usuario es requerido. No se puede dejar vacío.');
    if(validateModel({ email_username, password }, schema)){
      if(!await existsUser(email_username, email_username)){
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const user = await getUserInfo(email_username);
      if(await compare(password, user.password)){
        const token = await encode({
          id: user.id,
          expiresIn: Date.now() + toTime(365, 'days')
        });
        configurations.set('currentLoggedUserId', user.id);
        await db.commit();
        db.serialize(async () => {
          try {
            await db.begin();
            db.run("update users set last_session = datetime('now') where id = ?", [user.id], async (err) => {
              if(err) return console.log(err);
              await db.commit();
            });
            return res.status(200).json({ token });
          } catch(err){
            console.log(err);
            await db.rollback();
            res.status(500).json({ message: '¡Error al iniciar sesión! Error interno.' });
          }
        });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta', code: 'unauthorized' });
      }
    }

  } catch(err){
    if(err instanceof ValidationError){
      return res.status(400).json({ message: err.message });
    }
    if(err instanceof SQLError){
      return res.status(500).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = route;