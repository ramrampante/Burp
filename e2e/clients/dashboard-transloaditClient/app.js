import { Burp } from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import Transloadit from '@Burp/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const Burp = new Burp()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access Burp in tests
window.Burp = Burp
