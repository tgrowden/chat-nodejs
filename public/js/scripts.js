(function() {
  $(function() {
    var socket = io();
    var user = "anonymous";
    $('#messages').append($('<li class="alert">').text("Type \'\/nick new-user-name\' to change your username"));
    $('form').submit(function(){
      var arr = $('#msg').val().split(" ");
      if (arr[0] == '/nick') {
        var olduser = user;
        user = arr.slice(1).join(" ");
        $('#msg').val('');
        socket.emit('namechange', olduser, user);
        return false;
      } else {
        socket.emit('msg', $('#msg').val());
        $('#msg').val('');
        return false;
      }
    });
    socket.on('msg', function(msg){
        $('#messages').append($('<li>').text(user + ": " + msg));
      });
      socket.on('alert', function(msg) {
        $('#messages').append($('<li class="alert">').text(msg));
      });
  });
}());
