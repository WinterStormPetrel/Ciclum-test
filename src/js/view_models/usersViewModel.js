/**
 * Uses Singleton pattern for shared shared model-view for components: shellComponent and usersSidebarComponent
 * as the common part of user creation and managing logic
 */

 /*global define*/
 define([
  'knockout',
  '../module/ui_strings',
  '../module/socket',
  '../module/enterkey'
  ],
  function (ko, model, socket) {
    'use strict';

    var instance;
    function UsersViewModel(params) {
      var self = this;
      // login
      this.placeholder = model.login.placeholder;
      this.validation = model.login.validation;
      this.button = model.login.button;
      this.users = socket.users;
      this.error = socket.error;
      // sidebar
      this.title = model.users.title;
      // observables
      this.shellDisplay = ko.observable(true);
      this.enabled = ko.observable(false);
      this.name = ko.observable('');
      this.name.validationMessage = ko.observable('');
      this.name.isSelected = ko.observable(false);

      this.name.subscribe(function () {
        if (self.name().length < 1) {
          self.enabled(false);
          self.name.validationMessage(self.validation.noValue);
        } else {
          self.enabled(true);
          self.name.validationMessage('');
        }
      });
      this.label = ko.computed(function () {
        if (socket.error().message) {
          self.shellDisplay(true);
          return socket.error().message;
        } else {
          return model.login.label;
        }
      });
    }
    // Using of prototype to declare public methods
    UsersViewModel.prototype.hide = function () {
      this.shellDisplay(false);
    };
    UsersViewModel.prototype.login = function () {
      var self = this;

      socket.login(self.name(), function (obj) {
        if (obj) {
          // no name provided (I prefer to client check first)
          self.shellDisplay(true);
          if (obj.code === 10) {
            self.name.validationMessage(obj.message);
          }
          // user exist already
          if (obj.code === 11) {
            self.name.validationMessage(self.validation.existAlready);
          }
        } else {
          self.shellDisplay(false);
        }
        self.name('');
      });
    };

    // Return component definition
    return {
      model: UsersViewModel,
      getInstance: function () {
        if (!instance) {
          instance = new UsersViewModel();
        }
        return instance;
      }
    };
  });
