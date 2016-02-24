/*global define*/

define({
  main: {
    title: 'Chat',
    testText: 'Test'
  },
  login: {
    label: 'Enter user name:',
    placeholder: 'your login...',
    validation: {
      existAlready: 'Sorry, this name has been used already',
      noValue: 'You should enter yor name!'
    },
    button: 'login'
  },
  users: {
    title: 'Users in room'
  },
  rooms: {
    title: 'Rooms',
    createPlaceholder: 'Create room...'
  },
  message: {
    createPlaceholder:  'Send message...'
  },
  errors: {
    404: 'Not found'
  }
});
