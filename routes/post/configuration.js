const Route = require('../Route');
const configurations = require('../../configs');

const route = new Route('/configuration', async (req, res) => {
  try {
    let { configuration, value } = req.body;
    if(!configuration){
      return res.status(400).json({ message: "No se ha proporcionado una configuración" });
    }
    if(typeof configuration !== 'string'){
      return res.status(400).json({ message: "La configuración debe ser un string" });
    }
    if(configuration.length < 2 || configuration.length > 100){
      return res.status(400).json({ message: "La configuración debe tener entre 2 y 100 caracteres" });
    }
    if(!value){
      return res.status(400).json({ message: "No se ha proporcionado un valor" });
    }
   if(value === 'true' || value === 'false'){
    value = value === 'true';
   }
    configurations.set(configuration, value);
    res.status(200).json({ message: "Configuración actualizada" });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = route;