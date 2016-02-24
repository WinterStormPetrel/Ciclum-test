/*global define*/
/**
 * Audio module
 */

define([], function () {
  'use strict';

  function play(file) {
    var audio = new Audio(file);
    audio.play();
  }

  return {
    play: play
  };
});
