const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const start = Date.now();

function makeRequest(){
  https
    .request('https://www.google.com', res => {
      res.on('data', () =>{});
      res.on('end', ()=>{
        console.log(Date.now() - start);
      });
    })
    .end();
}

function doHash(){
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=> {
    console.log('Hash:', Date.now() - start);
  });

}

makeRequest();


fs.readFile('multitask.js', 'utf8', ()=>{
  console.log('FS', Date.now()-start); // FS 1532
});


doHash();
doHash();
doHash();
doHash();

/*
466
Hash: 1648
FS 1649
Hash: 1864
Hash: 1889
Hash: 1898
*/
