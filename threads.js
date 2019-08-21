process.env.UV_THREADPOOL_SIZE = 5;
const crypto = require('crypto');
const startTime = Date.now();

/*
  1st call to pbkdf2 (1st thread)
  expected time for callback to be executed is 1s
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

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
  console.log('3:', Date.now() - startTime);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
  console.log('4:', Date.now() - startTime);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
  console.log('5:', Date.now() - startTime);
});
