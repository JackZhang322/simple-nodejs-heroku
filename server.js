const express = require('express');
const app = express();

var colours = {
  Jim : 'blue',
  Dwight : 'orange',
  Pam : 'red',
  Michael : 'blue',
  Toby : 'grey',
  Creed : 'black',
  Andy : 'purple'};


app.get('/colour', (req, res) => {
  
    // Extract some parameters
    const name = req.query.name;
    if(name == '') {
       name = 'unknown'; 
    }

 
    if (name in colours) {
      const colour = colours[name];
    };  
  if (!(name in colours)) {
      const colour = 'unknown';
    };  
    res.send({ info: colour, result: 'success', rc: 0 });

  });

app.get('/disable', (req, res) => {
  // Extract some parameters from qualtrics
  const devid = req.query.devid;
  const auth = req.query.auth;

  
  
  // Call SOTI here
  const https = require('https');

  //build the mobicontrol request
  const options = {
    host: 's111720.mobicontrolcloud.com',
    port: 443,
    path: '/MobiControl/api/devices/ef2e83cb30a26257ceb824951058e039011451cb/parentPath',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + auth
    }
  };
  
  
  const req2 = https.request(options, function(res2) {
    //dont really need callback but im not sure if i can remove it
    res2.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  process.stdout.write(JSON.stringify(options));
  req2.write("'referenceId:dcacdec5-e9d2-43a8-bade-7baf7b19ccb7'");
  req2.end();
  
  //end soti call
  
  
  res.send({ Message: 'reached end of block'});
});

// testing alternate code
//const disreq = new XMLHttpRequest();
//disreq.open('PUT', 'https://s111720.mobicontrolcloud.com/MobiControl/api/devices/' + devId + '/parentPath');
//disreq.responseType = 'application/json';
//disreq.send();


app.get('/enable', (req, res) => {
  // Extract some parameters
  const devid = req.query.devid;
  const auth = req.query.auth;
  const https = require('https');


  const options = {
    host: 's111720.mobicontrolcloud.com',
    port: 443,
    path: '/MobiControl/api/devices/' + devid + '/parentPath',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + auth,
    }
  }
  
  const req2 = https.request(options, function(res2) {
    //dont really need callback but im not sure if i can remove it
    res2.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req2.write("'referenceId:dcacdec5-e9d2-43a8-bade-7baf7b19ccb7'");
  req2.end();
  
  res.send({
    Message: 'reached end of block'}
    );
});


const PORT = process.env.PORT || 3001;
app.listen(PORT);
