// Imports
const AWS = require('aws-sdk');

// TODO: Configure region
AWS.config.update({region: 'us-east-1'});

// Declare local variables
const ec2 = new AWS.EC2();

createImage('i-0d333fa689762c31e', 'hamsterImage')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName
  }
  return new Promise((reject, resolve) => {
    ec2.createImage(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
