/*global define*/

define([
  'knockout',
  '../view_models/roomsViewModel'
  ], function (ko, viewModel) {
    'use strict';

    ko.components.register('rooms-sidebar', viewModel);
  });
