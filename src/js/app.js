/*global require, define, document*/
/**
 * Main entry point of app.
 */

require([
  'text!../views/app.html',
  'view_models/appViewModel',
  'module/renderer',
  'module/socket',
  'components/roomsSidebarComponent',
  'components/usersSidebarComponent',
  'components/shellComponent',
  'module/onclose'
  ], function (appView, App, renderer) {
    'use strict';

    var container = document.body,
    viewModel = new App();
    renderer.render(container, appView, viewModel);
  });
define();
