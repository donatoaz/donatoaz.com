const s3 = require('s3')
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION || 'sa-east-1'

console.log('deploying to region', region);

const client = s3.createClient({
  s3Options: {
    accessKeyId,
    secretAccessKey,
    region,
  },
})

const bucket =
  process.env.BUCKET_NAME ||
  {
    STAGING: 'dev.donatoaz.com',
    PRODUCTION: 'donatoaz.com',
  }[process.env.DEPLOY_ENV || 'STAGING']

const params = {
  localDir: './public',
  deleteRemoved: true, // default false, whether to remove s3 objects

  s3Params: {
    Bucket: bucket,
  },
}

const uploader = client.uploadDir(params)

uploader.on('error', err => {
  console.error('unable to sync:', err.stack)
})
uploader.on('progress', () => {
  console.log('bucket', bucket)
  console.log('progress', uploader.progressAmount, uploader.progressTotal)
})
uploader.on('end', () => {
  console.log('done uploading')
})
