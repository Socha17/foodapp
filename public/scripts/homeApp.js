

$(document).ready(function() {
  $('.submitBtn').on('click', function (event) {
    event.preventDefault();
    console.log("prevent");
    console.log($('#email').val());
    console.log($('#pwd').val());
    $.ajax({
      url: '/home',
      method: 'POST',
      data: {email: $('#email').val(), password: $('#pwd').val()},
      success: function () {
        console.log("success");
      }
    });
  })

});
