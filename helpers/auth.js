const secureEndpoints = require('./validateEnpoints');
const hasPermission = require('./hasPermission');
const  { decode } = require('./ciphers');

function authenticate(req, res, next){
  try {
    const auth = req.headers.authorization;
    const method = req.method.toLowerCase();
    const route = req.url.split('/')[1].split('?')[0];
    const isSecure = secureEndpoints[method]?.includes(route);
    if(!isSecure) return next();
    if(!auth) return res.status(401).json({ message: 'No autorizado' });
    const token = auth.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'No autorizado' });
    decode(token)
      .then(async data => {
        if(Date.now() > data.expiresIn) return res.status(401).json({ message: 'Token expirado' });
        if(isNaN(Number(data.id))) return res.status(400).json({ message: 'ID no válido' });
        req.headers['user-id'] = Number(data.id);
        if(secureEndpoints.permissions[route]){
          for(const perm of secureEndpoints.permissions[route]){
            if(!await hasPermission(Number(data.id), perm)) return res.status(403).json({message: 'Acesso negado'});
          }
        }
        next();
      })
      .catch(err => {
        // console.error(err);
        return res.status(401).json({ message: 'No autorizado. Al parecer hay un error en la formación del TOKEN' });
      });

  } catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { authenticate };