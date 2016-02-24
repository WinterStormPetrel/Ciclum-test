/*global define*/

define(['knockout'], function (ko) {
  'use strict';

  function render(container, view, viewModel) {
    container.innerHTML = view;
    ko.applyBindings(viewModel, container);
  }

  return {
    render: render
  };
});
