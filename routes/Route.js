const { validateModel, ValidationError } = require('../helpers/validateModel');
const bcrypt = require('bcrypt');
const db = require('../database');

class Route {
  constructor(path, handler){
    this.path = path;
    this.handler = handler;
    this.ValidationError = ValidationError;
    this.db = db;
  }
  validateModel(model, schema){
    return validateModel(model, schema);
  }
  async hashPassword(password){
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(password, hash){
    return await bcrypt.compare(password, hash);
  }
}

module.exports = Route;