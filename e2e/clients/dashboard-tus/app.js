import { Burp } from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import Tus from '@Burp/tus'
import Unsplash from '@Burp/unsplash'
import Url from '@Burp/url'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const Burp = new Burp()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access Burp in tests
window.Burp = Burp
