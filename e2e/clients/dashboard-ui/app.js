import Burp from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import RemoteSources from '@Burp/remote-sources'
import Webcam from '@Burp/webcam'
import ScreenCapture from '@Burp/screen-capture'
import GoldenRetriever from '@Burp/golden-retriever'
import ImageEditor from '@Burp/image-editor'
import DropTarget from '@Burp/drop-target'
import Audio from '@Burp/audio'
import Compressor from '@Burp/compressor'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.Burp.io'

const Burp = new Burp()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access Burp in tests
window.Burp = Burp
