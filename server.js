const express = require('express');
const app = express();



// Restricts phone by moving it to the Bricked Devices Group
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
    //you will need to change the host and port to whatever Soti server you are using
    path: '/MobiControl/api/devices/'+devid+'/parentPath',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + auth
    }
  };
  
  //send http request to Soti
  const req2 = https.request(options, function(res2) {
    res2.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  process.stdout.write(JSON.stringify(options));
  req2.write("'referenceId:dcacdec5-e9d2-43a8-bade-7baf7b19ccb7'");
  //this write function here passes on the group id to Soti. Replace this with your reference id for the bricked group
  req2.end();
  
  //end soti call
  
  
  res.send({ 
    Message: 'reached end of block'
  });
});


//Opposite function to disable. Moves the device back to the active devices group
app.get('/enable', (req, res) => {
  // Extract some parameters
  const devid = req.query.devid;
  const auth = req.query.auth;

  const https = require('https');

  const options = {
    host: 's111720.mobicontrolcloud.com',
    port: 443,
    //you will need to change the host and port to whatever Soti server you are using
    path: '/MobiControl/api/devices/' + devid + '/parentPath',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + auth,
    }
  }
  
  const req2 = https.request(options, function(res2) {
    res2.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  process.stdout.write(JSON.stringify(options));
  req2.write("'referenceId:75e1cdac-030b-46f4-bd7d-316345ef0f1d'");
  //Replace this reference id with the reference id of your active devices group
  req2.end();
  
  res.send({
    Message: 'reached end of block'}
    );
});


const PORT = process.env.PORT || 3001;
app.listen(PORT);
