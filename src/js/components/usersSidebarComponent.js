/*global define*/

define([
  'knockout',
  '../view_models/usersViewModel',
  'text!../../views/users-sidebar.html'
  ], function (ko, viewModel, view) {
    'use strict';

    ko.components.register('users-sidebar', {
      viewModel: {
        instance: viewModel.getInstance()
      },
      template: view
    });
  });
