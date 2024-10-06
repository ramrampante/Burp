import { Burp } from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import XHRUpload from '@Burp/xhr-upload'
import Unsplash from '@Burp/unsplash'
import Url from '@Burp/url'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

const companionUrl = 'http://localhost:3020'
const Burp = new Burp()
  .use(Dashboard, { target: '#app', inline: true })
  .use(XHRUpload, { endpoint: 'https://xhr-server.herokuapp.com/upload', limit: 6 })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access Burp in tests
window.Burp = Burp
