const fs = require('fs');
const path = require('path');

const dir = path.join('C:/BbelStudio/Apps/Tasks/', 'configurations.json');

const configurations = {
  exists(){
    return fs.existsSync(dir);
  },
  get(config){
    if(!configurations.exists()){
      fs.writeFileSync(dir, JSON.stringify({}), { encoding: 'utf-8'});
    }
    return JSON.parse(fs.readFileSync(dir, { encoding: 'utf-8'}))[config];
  },
  set(config, value){
    if(!configurations.exists()){
      fs.writeFileSync(dir, JSON.stringify({}), { encoding: 'utf-8'});
    }
    const file = JSON.parse(fs.readFileSync(dir, { encoding: 'utf-8'}));
    file[config] = value;
  }
}

module.exports = configurations;