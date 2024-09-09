import { Burp } from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import AwsS3 from '@Burp/aws-s3'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

const Burp = new Burp()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

window.Burp = Burp
