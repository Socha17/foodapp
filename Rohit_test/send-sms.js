// Setup credentials
var accountSid = 'AC3357d80625a26f42893a0de2106e7a84';
var authToken = '95078185f16cd27b11ace4da4f3b7b54';

// Setup twilio rest client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: '+16478711822',
  from:'16474928049',
  body: 'Dream team foodApp sending messages!'
  }, function(err, message) {
    if(err){
      console.log(err);
    } else{
      console.log(message.sid);
    }
  });

