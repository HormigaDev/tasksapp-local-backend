const fs = require('fs');
const path = require('path');
const dir = path.join(process.env.ROOT, 'BbelStudio', 'Apps', 'Tasks', 'Logs');
if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function crashLog(err){
  const date = new Date().toFormat('YYYY-MM-DD');
  const identifier = Date.now();
  const log = path.join(dir, `${date}_${identifier}.log`);
  try {
    fs.writeFileSync(log, err.stack);
  } catch(err){
    return;
  }
}

module.exports = crashLog;