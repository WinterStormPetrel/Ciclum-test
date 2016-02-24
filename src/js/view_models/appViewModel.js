/*global define*/
/**
 * App view model ($root for knockout)
 */

define([
  'knockout',
  '../module/ui_strings',
  '../module/socket',
  'view_models/roomsViewModel',
  'view_models/usersViewModel'
], function (ko, model, socket) {
  'use strict';

  var self;

  function App() {
    self = this;
    this.placeholder = model.message.createPlaceholder;
    this.room = socket.room;
    this.messages = socket.messages;
    this.isAuthor = socket.currentUser;
    this.offline = socket.offline;
    this.testText = model.main.testText;
    this.title = model.main.title;
    // observables
    this.toggleLeftSidebar = ko.observable(false);
    this.toggleRightSidebar = ko.observable(false);
    this.isSelected = ko.observable(true);
    this.content = ko.observable('');
  }

  // Using of prototype to declare public methods
  App.prototype.getTime = function (date) {
    var parsedDate;
    if (date) {
      parsedDate = new Date(Date.parse(date));
      return parsedDate.getHours() + ':' + parsedDate.getMinutes();
    }
  };
  App.prototype.sidebarToggle = function (str) {

    if (str === 'left'){
      this.toggleLeftSidebar(!this.toggleLeftSidebar());
      this.toggleRightSidebar(false);
    } else {
      this.toggleRightSidebar(!this.toggleRightSidebar());
      this.toggleLeftSidebar(false);
    }
  };
  App.prototype.sendMessage = function () {
    var content = self.content();
    if (content.length > 0) {
      socket.sendMessage(content);
      this.content('');
    }
    this.isSelected(true);
  };

  return App;
});
