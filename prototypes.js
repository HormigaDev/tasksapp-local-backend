Date.prototype.toFormat = function(format='YYYY-MM-DD HH:mm:ss'){
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const day = this.getDate();
  const hour = this.getHours();
  const minute = this.getMinutes();
  const second = this.getSeconds();
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}

Object.prototype.toArray = function(){
  let array = [];
  const obj = this;
  for(const key of Object.keys(obj)){
    array.push(obj[key]);
  }
  return array;
}

/**
 * 
 * @param {number} number - Número de niveles a subir
 */
String.prototype.ul = function(number){
  let ul = this;
  for(let i = 0; i < number; i++){
    ul = '../' + ul;
  }
  return ul;
}