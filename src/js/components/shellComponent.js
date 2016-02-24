/*global define*/

define([
  'knockout',
  '../view_models/usersViewModel',
  'text!../../views/shell.html'
  ], function (ko, viewModel, view) {
    'use strict';

    ko.components.register('shell', {
      viewModel: {
        instance: viewModel.getInstance()
      },
      template: view
    });
  });
