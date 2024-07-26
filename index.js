process.env.ROOT = '.';
require('./prototypes.js');

const express = require('express');
const app = express();
const cors = require('cors');
const { authenticate } = require('./helpers/auth.js');
const detectUserId = require('./helpers/detectUserId');
const router = require('./router.js');
const { createDatabase } = require('./database.js');
const createAppFolder = require('./helpers/createAppFolder');
const PORT = 19222;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(authenticate);
app.use(detectUserId);

async function main() {
  try {
    createAppFolder();
  } catch(err){
    console.log(`Error al crear la carpeta raíz de la aplicación: ${err}`);
    return;
  }
  try {
    createDatabase();
  } catch(err){
    console.log(`Error al crear la base de datos: ${err}`);
    return;
  }
  router(app);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();