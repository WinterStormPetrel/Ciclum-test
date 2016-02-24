/*globals define, console*/
/**
 *  Socket connector
 */

define([
  'knockout',
  'io',
  '../module/notification',
  '../module/audio',
  '../module/scroll'
], function (ko, io, no, audio, scroll) {
  'use strict';

  var instance,
      self,
      url = 'tests2.dotask.org',
      sound = '../../assets/alert.mp3',
      ioconfig = {reconnection: true};

  function Socket() {
    self = this;
    this.io = io;
    this.users = ko.observableArray([]);
    this.rooms = ko.observableArray([]);
    this.messages = ko.observableArray([]);
    this.offline = ko.observable(false);
    this.error = ko.observableArray();
    this.currentUser = ko.observable('');
    this.currentRoom = ko.observable('');
    this.removedRooom = ko.observableArray([]);
  }

  // Using of prototype to declare public methods
  var socket = (function () {
    return io.connect(url, ioconfig)
      .on('connect', function () {
      self.offline(false);
      if(self.currentUser()) {
        self.login(self.currentUser());
      }
    });
  })();

  socket.on('connect_error', function (obj) {
    console.error(obj);
    self.offline(true);
  })
  .on('disconnect', function(){
    self.offline(true);
  })
  .on('connect_timeout', function () {
    self.offline(true);
  })
  .on('reconnect', function () {
    self.offline(true);
  })
  .on('appError', function (obj) {
    switch(obj.code) {
      case 10:
        break;
      case 11:
        break;
      default:
        self.error(obj);
    }
  })
  .on('setup', function (obj) {
    ko.utils.arrayForEach(obj.rooms, function(room) {
      room.editable = ko.observable(false);
      room.newName = ko.observable(room.name);
      room.name = ko.observable(room.name);
    });
    self.rooms(obj.rooms);
    self.currentUser(obj.username);
  })
  .on('room created', function (room) {
    room.editable = ko.observable(false);
    room.newName = ko.observable(room.name);
    room.name = ko.observable(room.name);
    self.rooms.push(room);
  })
  .on('room removed', function (room) {
    for (var i in self.rooms()) {
      if (self.rooms()[i]._id === room._id) {
        self.rooms().splice(i, 1);
        self.rooms(self.rooms());
      }
    }
  })
  .on('room switched', function (obj) { // messages, users, room
    self.users(obj.users);
    self.messages(obj.messages);
    self.currentRoom(obj.room);
    scroll.scrollBottom (document.getElementById('middle'));
    //console.log('current room user -' + self.currentRoom().user.name);
  })
  .on('user joined', function (user) {
    self.users.push(user[0]);
  })
  .on('user left', function (user) {
    for (var i in self.users()) {
      if (self.users()[i].name === user[0].name) {
        self.users().splice(i, 1);
        self.users(self.users());
      }
    }
  })
  .on('message created', function (message) {
    self.messages.push(message);
    scroll.scrollBottom(document.getElementById('middle'));
    if(message.user.name !== self.currentUser()){
      audio.play(sound);
      no.notify(message.user.name, message.content);
    }
  })
  .on('room updated', function (room) {
    var i, item;
    for (i in self.rooms()) {
      item = self.rooms()[i];
      if (item._id === room._id) {
        item.name(room.name);
        item.newName(room.name);
      }
      if (self.currentRoom()._id === room._id){
        self.currentRoom(room);
      }
    }
  });

  Socket.prototype.login = function (name, fn) {
    socket.emit('login', {
      username: name
    }).on('user joined', function () {
      if(!!fn) {
        fn();
      }
    })
    .on('appError', function (obj) { // id, message
      if (obj.code === 11 || obj.code === 10) {
        fn(obj);
      }
    });
    return this;
  };

  Socket.prototype.editRoom = function (config , fn) {
    socket.emit('edit room', {
      id: config.id,
      name: config.name,
      remove: config.remove
    });
  };

  Socket.prototype.createRoom = function (name) {
    socket.emit('new room', {
      name: name
    });
  };

  Socket.prototype.switchRoom = function (id) {
    socket.emit('switch room', {
      _id: id
    });
  };

  Socket.prototype.sendMessage = function (msg) {
    socket.emit('new message', {
      message: msg
    });
  };

  if (!instance) {
    instance = new Socket();
  }

  return instance;
});
