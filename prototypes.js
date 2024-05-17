Date.prototype.toFormat = function(format='YYYY-MM-DD HH:mm:ss'){
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const day = this.getDate();
  const hour = this.getHours();
  const minute = this.getMinutes();
  const second = this.getSeconds();
  return format
    .replace('YYYY', year)
    .replace('MM', ('0'+month).slice(-2))
    .replace('DD', ('0'+day).slice(-2))
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

Number.prototype.repeat = function(quantity=2){
  if(typeof quantity !== 'number') throw new Error('La cantidad informada debe ser un número');
  let array = [];
  for(let i = 0; i < quantity; i++){
    array.push(this);
  }
  return array;
}