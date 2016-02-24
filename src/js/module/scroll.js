/*global define*/
/**
 * Scroll module
 */

define([], function () {
  'use strict';

  function scrollBottom(element) {
    if(element){
      element.scrollTop = element.scrollHeight;
    }
  }

  return {
    scrollBottom: scrollBottom
  };
});
