const fs = require('fs');
const path = require('path');
const dir = path.join(process.env.ROOT, 'BbelStudio/Apps/Tasks');


module.exports = function createAppFolder(){
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
}