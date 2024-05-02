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
  for(const key in this){
    array.push(this[key]);
  }
  return array;
}