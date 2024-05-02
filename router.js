const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'routes');
const types = ['get', 'post', 'put', 'delete'];

module.exports = (app) => {
  for(const type of types){
    const files = fs.readdirSync(path.resolve(dir, type)).filter(file => file.endsWith('.js'));
    for(const file of files){
      const route = require(path.resolve(dir, type, file));
      try{
        app[type](route.path, route.handler);
      } catch(err){
        console.error(`Error in ${file}: ${err.message}`);
      }
    }
  }
}