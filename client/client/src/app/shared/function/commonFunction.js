/**
 * Created by Chip Bom on 12/30/2016.
 */
var timeOutSuccess, timeOutErr, errMessage = $('.notification > .errorNotification'), successMessage = $('.notification > .successNotification');
function AlertMessage(type, message, setTimeInterval = 3000) {
  if (type == 0) {
    clearTimeout(timeOutErr);
    errMessage.fadeOut(300);
    errMessage.text(message);
    errMessage.fadeIn(300);
    timeOutErr = setTimeout(function () {
      errMessage.fadeOut(300);
    }, setTimeInterval)
  } else {
    clearTimeout(timeOutSuccess);
    successMessage.fadeOut(300);
    successMessage.text(message);
    successMessage.fadeIn(300);
    timeOutSuccess = setTimeout(function () {
      successMessage.fadeOut(300);
    }, setTimeInterval)
  }
}
function getNewKeyAndTimeStamp() {
  let timeStamp = Math.floor(new Date().valueOf() / 1000);
  let keyPass = CryptoJS.MD5(`8498793949518795432${timeStamp}`).toString();
  return {
    t: timeStamp,
    k: keyPass
  };
}

Array.prototype.remove = function (elem) {
  var i = this.indexOf(elem);
  if (i >= 0) this.splice(i, 1);
  return this;
};

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
  createCookie(name, undefined, -1);
}

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  }
  else {
    return results[1] || 0;
  }
};