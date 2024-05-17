/**
 * 
 * @param {string} unit - La unidad a la que se va a convertir el número
 * @returns {number}
 */
function convertToTime(num, unit='seconds'){
  const admiteds = {
    seconds: 1 * 1000,
    minutes: 60 * 1000,
    hours: 3600 * 1000,
    days: 86400 * 1000,
    weeks: 604800 * 1000,
    months: 2592000 * 1000,
    years: 31536000 * 1000
  };
  if(!admiteds[unit]) throw new Error('Unidad no permitida');
  return num * admiteds[unit];
}

module.exports = convertToTime;