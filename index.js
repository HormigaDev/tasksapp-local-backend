require('./prototypes.js');

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router.js');
const PORT = 19222;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  router(app);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();