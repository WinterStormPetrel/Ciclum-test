/*global define, window*/

define(function () {
  'use strict';

  window.onbeforeunload = function (env) {
    var str = 'Hope you like this Chat application';
    return str;
  };
});
