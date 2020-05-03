module.exports = {}

// 取时间的年月日
function processTimeInArray(coms, key) {
      for (var i = 0; i < coms.length; i++) {
            coms[i] = processTime(coms[i], key);
      }
      return coms;
}

function processTime(obj, key) {
      obj[key] = obj[key].substring(0, 10);
      return obj;
}

/**
 * 处理云数据库的时间
 */
function getTime(time) {
      return time.slice(0, 10).concat(' ' + time.slice(11, 16))
}

/**
 * 计算时间差（min）
 * thisTime: 用于对比的时间
 * currTime: 当前时间
 */
function timeGap(thisTime, currTime) {
      // console.log(thisTime)
      // console.log(currTime)
      //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
      var begin1 = thisTime.substr(0, 10).split("-");
      var end1 = currTime.substr(0, 10).split("-");

      //将拆分的数组重新组合，并实例成化新的日期对象
      var date1 = new Date(begin1[1] + - +begin1[2] + - +begin1[0]);
      var date2 = new Date(end1[1] + - +end1[2] + - +end1[0]);

      //得到两个日期之间的差值m，以分钟为单位
      //Math.abs(date2-date1)计算出以毫秒为单位的差值
      //Math.abs(date2-date1)/1000得到以秒为单位的差值
      //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
      var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);

      //小时数和分钟数相加得到总的分钟数
      //time.substr(11,2)截取字符串得到时间的小时数
      //parseInt(time.substr(11,2))*60把小时数转化成为分钟
      var min1 = parseInt(thisTime.substr(11, 2)) * 60 + parseInt(thisTime.substr(14, 2));
      var min2 = parseInt(currTime.substr(11, 2)) * 60 + parseInt(currTime.substr(14, 2));

      //两个分钟数相减得到时间部分的差值，以分钟为单位
      var n = min2 - min1;

      //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
      return m + n;
}

/**
 * 获取当前时间
 * fullyear-month-date hours:min
 */
function getLocalTime() {
      var date = new Date()
      var year = date.getFullYear().toString()
      var getmonth = (date.getMonth() + 1).toString()
      var getdate = date.getDate().toString()
      var gethours = date.getHours().toString()
      var getmin = date.getMinutes().toString()
      var month = getmonth.length == 1 ? ('0' + getmonth) : getmonth
      var date = getdate.length == 1 ? ('0' + getdate) : getdate
      var hours = gethours.length == 1 ? ('0' + gethours) : gethours
      var min = getmin.length == 1 ? ('0' + getmin) : getmin
      return year + '-' + month + '-' + date + ' ' + hours + ':' + min
}

/**
 * 获取相差时间
 */
function getGap(thisTime, currTime) {
      var minGap = this.timeGap(thisTime, currTime)
      var time
      if (minGap < 60) {
            if (minGap == 0) {
                  minGap = 1
            }
            time = minGap + '分钟之前'
      } else if (minGap < 60 * 24) {
            time = parseInt(minGap / 60) + '小时之前'
      }
      return time
}

module.exports.processTime = processTime;
module.exports.processTimeInArray = processTimeInArray;
module.exports.getTime = getTime;
module.exports.timeGap = timeGap;
module.exports.getLocalTime = getLocalTime;
module.exports.getGap = getGap;