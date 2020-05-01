module.exports = {}

// 取时间的年月日
function processTimeInArray(coms, key){
  for (var i=0; i < coms.length; i++){
    coms[i] = processTime(coms[i], key);
  }
  return coms;
}

function processTime(obj, key){
  obj[key] = obj[key].substring(0, 10);
  return obj;
}

module.exports.processTime = processTime;
module.exports.processTimeInArray = processTimeInArray;