const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * 
 * @param {string | object | Buffer} data - El dato que se va a codificar 
 * @returns {Promise<string>}
 */
function encode(data){
  return new Promise((resolve, reject) => {
    jwt.sign(data, 'S3CR37', (err, token) => {
      if(err){
        console.log(err);
        reject(new Error('Error generating token'))
      } else {
        resolve(token);
      }
    });
  });
}

/**
 * 
 * @param {string} token - El token que se va a decodificar
 * @returns {Promise<object> | Promise<string> | Promise<Buffer>}
 */
function decode(token){
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'S3CR37', (err, decoded) => {
      if(err){
        // console.log(err);
        reject(new Error('Error decoding token'))
      } else {
        resolve(decoded);
      }
    });
  });
}

/**
 * 
 * @param {string} password - La contraseña que se va a encriptar
 * @returns {Promise<string>}
 */
async function hash(password) {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * 
 * @param {string} password - La contraseña que se va a comparar
 * @param {string} hash - El hash con el que se va a comparar
 * @returns {Promise<boolean>}
 */
function compare(password, hash){
  return bcrypt.compare(password, hash);
}

module.exports = { encode, decode, hash, compare };