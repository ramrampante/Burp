import AwsS3 from '@Burp/aws-s3'
import Burp from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import GoogleDrive from '@Burp/google-drive'
import Webcam from '@Burp/webcam'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'
import '@Burp/webcam/dist/style.css'

const Burp = new Burp({
  debug: true,
  autoProceed: false,
})

Burp.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
Burp.use(Webcam)
Burp.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'Webcam'],
})
Burp.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
