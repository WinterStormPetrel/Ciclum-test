/*global requirejs, define*/
/**
 * Config file for RequireJS
 */
requirejs.config({
  deps: ['app'],
  enforceDefine: false,
  paths: {
    knockout: 'libs/knockout-latest',
    text: 'libs/text',
    io: 'libs/socket.io'
  },
  shim: {
    text: {
      exports: 'text'
    },
    io: {
      exports: 'io'
    }
  }
});
define();
