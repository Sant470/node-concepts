const https = require('https');
function makeCall(url){
    return new Promise((resolve, reject) => {
      https
        .request(url, res => {
          res.on('data', (data) =>{console.log("url ",data);});
          res.on('end', (data)=>{
            console.log("url ",data);
            resolve(data);
          });
        }).on('error', (err) => {
          console.log(err.message);
          reject(err);
        })
        .end();
  });
}


Promise.all([makeCall('https://google.com'),makeCall('https://facebook.com')]).then((result)=>{
  console.log("here done result 0 ",result[0]);
  console.log("here done result 0 ",result[1]);
},(err)=>{
  console.log("here err" ,err);
})
