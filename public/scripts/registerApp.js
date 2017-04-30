$(document).ready(() => {

$('#email').remove();
$('#pwd').remove();
$('.submitBtn').remove();

$(".name").focus(function(){
  $(".name-help").slideDown(500);
}).blur(function(){
  $(".name-help").slideUp(500);
});

$(".email").focus(function(){
  $(".email-help").slideDown(500);
}).blur(function(){
  $(".email-help").slideUp(500);
});


$(".password").focus(function(){
  $(".password-help").slideDown(500);
}).blur(function(){
  $(".password-help").slideUp(500);
});

$(".form").find(".submit").on('click', (event) => {

    let nameInfo = $(".form").find(".name").val()
    let emailInfo = $(".form").find(".email").val()
    let passwordInfo = $(".form").find(".password").val()

    let string_to_array = (str) => {
     return str.trim().split(" ");
    };
    let nameArr = string_to_array(nameInfo);

    let sendUserInfo = {first_name: nameArr[0], last_name: nameArr[1], email: emailInfo, password: passwordInfo}
  //  event.preventDefault();
    console.log(nameArr);
    $.ajax({
      url: '/register',
      method: 'POST',
      data: sendUserInfo
    }).done((res) => {


      console.log("User Info captured",res);
      console.log("Message request sent");

    })


})









})
