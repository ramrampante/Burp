import Burp from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import Compressor from '@Burp/compressor'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

const Burp = new Burp()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access Burp in tests
window.Burp = Burp
