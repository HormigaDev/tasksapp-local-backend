const Route = require('../Route');
const configurations = require('../../configs');

const route = new Route('/configuration', async (req, res) => {
  try {
    const { configuration } = req.query;
    if(!configuration){
      return res.status(400).json({ message: "No se ha proporcionado una configuración" });
    }
    if(typeof configuration !== 'string'){
      return res.status(400).json({ message: "La configuración debe ser un string" });
    }
    if(configuration.length < 2 || configuration.length > 100){
      return res.status(400).json({ message: "La configuración debe tener entre 2 y 100 caracteres" });
    }

    const value = await configurations.get(configuration);
    return res.status(200).json({ configuration: value });

  } catch(err){
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = route;