/*global define*/

define(['knockout'], function (ko) {
  'use strict';

  ko.bindingHandlers.enterkey = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      ko.utils.registerEventHandler(element, 'keydown', function(evt) {
        if (evt.keyCode === 13) {
          evt.preventDefault();
          evt.target.blur();
          valueAccessor().call(viewModel);
        }
      });
    }
  };
});
