/*global window, alert, console, define*/

define(['knockout'], function () {
  'use strict';

  //Requests permission
  var Notification = window.Notification || window.mozNotification || window.webkitNotification || null;

  if (!Notification) {
    alert('Sorry no notifications supported!');
  } else {
    Notification.requestPermission(function (p) {
      if (p === 'denied') {
        alert('Sorry, notification is denied by user!');
      } else if (p === 'granted') {
        console.info(p);
      }
    });
  }

  return {
    notify: function (user, message) {
      var notify,
        title = 'New message from ' + user,
        contentObj = {
          icon: '../../assets/logo.png',
          tag: '',
          body: message
        };

      if (Notification.permission === 'default') {
        alert('Please allow notifications');
      } else {
        notify = new Notification(title, contentObj);
        window.navigator.vibrate(500);

        notify.onclick = function () {
          window.location = './';
        };
      }
    }
  };
});
