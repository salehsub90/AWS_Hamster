// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/Z24S2NVLX42HBF'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.online',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-1820868817.us-east-1.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z35SXDOTRQ7X7K'
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/rande.html#elb_region

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
