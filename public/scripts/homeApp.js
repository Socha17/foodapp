
let loginTrue = 0;





$(document).ready(function() {

  $('.submitBtn').on('click', function (event) {


    let email = $('#email').val();
    let password = $('#pwd').val();

    console.log(email);
    console.log(password);

    if (email == "" || email == undefined) {
      event.preventDefault();
      $('#email').addClass( "formError" );
      $('#pwd').addClass( "formError" );
      $(".alertMessage").css("display", "block" );
      setTimeout( function() { $('#email').removeClass( "formError" ); $('#pwd').removeClass( "formError" ); $(".alertMessage").css("display", "none"); }, 3000);
    } else {

      $.ajax({
        url: '/home',
        method: 'POST',
        data: {email: email, password: password},
        success: function () {
          $('.submitBtn').unbind('submit').submit()
          console.log("success1");

        }
      });
    }
  })





});
