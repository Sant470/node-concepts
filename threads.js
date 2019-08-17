const crypto = require('crypto');
const startTime = Date.now();

/*
  1st call to pbkdf2 (1st thread)
*/
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
  console.log('1:', Date.now() - startTime);
});


/*
  2nd call to pbkdf2 (2nd thread), expect both of time difference to be almost same.
*/
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
  console.log('2:', Date.now() - startTime);
});
