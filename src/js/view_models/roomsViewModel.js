/*global define*/
/**
 * Room view model (used by rooms component)
 */
define([
  'knockout',
  'text!../../views/rooms-sidebar.html',
  '../module/ui_strings',
  '../module/socket'
  ], function (ko, view, model, socket) {
    'use strict';
    var self;

    function RoomsViewModel(params) {
      self = this;
      this.title = model.rooms.title;
      this.placeholder = model.rooms.createPlaceholder;
      this.rooms = socket.rooms;
      this.currentRoom = socket.currentRoom;
      this.newRoomName = ko.observable('');
      this.isActive = ko.observable();
    }

    // Using of prototype to declare public methods
    RoomsViewModel.prototype.createRoom = function () {
      var newRoomName = this.newRoomName();
      if (newRoomName.length > 0) {
        socket.createRoom(newRoomName);
      }
      this.newRoomName('');
    };
    RoomsViewModel.prototype.deleteRoom = function() {
      var item = this,
        config = {
          id: item._id,
          name: item.name,
          remove: true
        };
      socket.editRoom(config);
    };
    RoomsViewModel.prototype.setCurrentRoom = function() {
      socket.switchRoom(this._id);
    };
    RoomsViewModel.prototype.editRoomName = function() {
      this.editable(!this.editable());
    };
    RoomsViewModel.prototype.editRoom = function() {
      var item = this,
        newRoomName = item.newName(),
        config = {
          id: item._id,
          name: newRoomName,
          remove: false
        };
      if (newRoomName.length > 0) {
        socket.editRoom(config);
      }
      item.editable(false);
    };
    RoomsViewModel.prototype.closeRoomSidebar = function(parent, root) {
      parent.setCurrentRoom.apply(this);
      if(!this.editable()){
        root.sidebarToggle('left');
      }
    };

    // Return component definition
    return {
      viewModel: RoomsViewModel,
      template: view
    };
  });
