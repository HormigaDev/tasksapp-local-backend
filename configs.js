const fs = require('fs');
const path = require('path');

const dir = path.join('./Tasks/', 'configurations.json');

const configurations = {
  exists(){
    return fs.existsSync(dir);
  },
  get(config){
    if(!configurations.exists()){
      fs.writeFileSync(dir, JSON.stringify({}), { encoding: 'utf-8'});
    }
    const data = JSON.parse(fs.readFileSync(dir, { encoding: 'utf-8'}));
    if(!data){
      return null;
    }
    return data[config];
  },
  set(config, value){
    if(!configurations.exists()){
      fs.writeFileSync(dir, JSON.stringify({}), { encoding: 'utf-8'});
    }
    const file = JSON.parse(fs.readFileSync(dir, { encoding: 'utf-8'}));
    file[config] = value;
    fs.writeFileSync(dir, JSON.stringify(file, null, 2), { encoding: 'utf-8'});
  }
}

module.exports = configurations;