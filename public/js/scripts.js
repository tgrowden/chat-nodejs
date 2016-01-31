(function() {
  $(function() {
    var socket = io();
    var user = "anonymous";
    $('#msg').focus();
    $('#messages').append($('<li class="alert">').text("Type \'\/nick new-user-name\' to change your username"));
    $('html').click(function() {
      $('#msg').focus();
    });
    $('form').submit(function(){
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
    socket.on('msg', function(msg){
        $('#messages').append($('<li>').text(msg));
      });
      socket.on('alert', function(msg) {
        $('#messages').append($('<li class="alert">').text(msg));
      });
  });
}());
