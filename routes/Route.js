// const bcrypt = require('bcrypt');

class Route {
  /**
   * 
   * @param {string} path - La ruta del endpoint
   * @param {function} handler - La función que se ejecutará al llegar una petición a la ruta 
   */
  constructor(path, handler){
    this.path = path;
    this.handler = handler;
  }
  // async hashPassword(password){
  //   return await bcrypt.hash(password, 10);
  // }
  // async comparePassword(password, hash){
  //   return await bcrypt.compare(password, hash);
  // }
}

module.exports = Route;