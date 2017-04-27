

$(document).ready(function() {

  $('.submitBtn').on('click', function (event) {
    event.preventDefault();
    console.log("prevent");
    $.ajax({
      url: '/home',
      method: 'POST',
      success: function () {
        console.log("success");
      }
    });
  })

});
