(function() {
  $(function() {
    var socket = io();
    var user = "anonymous";
    $('#msg').focus();
    $('#messages').append($('<li class="notice">').text("Type \'\/nick new-user-name\' to change your username"));
    $('html').click(function() {
      $('#msg').focus();
    });

    $('form').submit(function() {
      var arr = $('#msg').val().split(" ");
      if (arr[0] == '/nick') {
        var olduser = user;
        user = arr.slice(1).join(" ");
        $('#msg').val('');
        socket.emit('namechange', olduser, user);
        return false;
      } else {
        socket.emit('msg', user + ":  " + $('#msg').val());
        $('#msg').val('');
        return false;
      }
    });
    socket.on('msg', function(msg) {
      $('#messages').append($('<li class="msg">').text(msg));
    });
    socket.on('alert', function(msg) {
      $('#messages').append($('<li class="notice">').text(msg));
    });
    socket.on('updateReq', function() {
      $('#users').empty();
      socket.emit('userUpdate', user);
    });
    socket.on('addUser', function(newUser) {
      $('#users').append($('<li class="list-group-item borderless">').text(newUser));
    });
  });
}());
