import Burp from '@Burp/core'
import Webcam from '@Burp/webcam'
import Dashboard from '@Burp/dashboard'
import XHRUpload from '@Burp/xhr-upload'

import '@Burp/core/dist/style.css'
import '@Burp/webcam/dist/style.css'
import '@Burp/dashboard/dist/style.css'

const Burp = new Burp({
  debug: true,
  autoProceed: false,
})

Burp.use(Webcam)
Burp.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['Webcam'],
})
Burp.use(XHRUpload, {
  endpoint: 'http://localhost:3020/upload',
})
