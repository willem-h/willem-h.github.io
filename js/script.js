function countdown () {
  var lastExam = new Date(2015, 10, 11,  16, 45); // 4:45 PM, 11 Nov 2015
  var now = Date.now();

  var diff = lastExam - now;

  if (diff === 0) {
    clearInterval(timer);
  }

  var msec = diff;
  var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= dd * 1000 * 60 * 60 * 24;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  document.getElementById("days").innerHTML = dd + "<span>days</span>";
  document.getElementById("time").innerHTML = hh + "<span>hrs</span> " + mm + "<span>mins</span> " + ss + "<span>secs</span>";
}

var timer = setInterval(function () {
  countdown();
},1000);

countdown();
