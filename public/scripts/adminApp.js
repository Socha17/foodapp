
$(document).ready(function() {


console.log("docuemnt ready");

  $.ajax({
    url: '/admin',
    method: 'GET',
  }).done((data) => {
    console.log("success");
    console.log(data);
    console.log(data.objFood[0].name);

  });


});
