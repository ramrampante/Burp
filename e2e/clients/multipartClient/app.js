import { Burp } from '@Burp/core'
import Dashboard from '@Burp/dashboard'
import AwsS3Multipart from '@Burp/aws-s3-multipart'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'

const Burp = new Burp()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3Multipart, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
    // This way we can test that the user provided API still works
    // as expected in the flow. We call the default internal function for this,
    // otherwise we would have to run another server to pre-sign requests
    // and we don't care about that, just that the flow works.
    async prepareUploadParts (file, { uploadId, key, parts, signal }) {
      const { number: partNumber, chunk: body } = parts[0]
      const plugin = Burp.getPlugin('AwsS3Multipart')
      const { url } = await plugin.signPart(file, { uploadId, key, partNumber, body, signal })
      return { presignedUrls: { [partNumber]: url } }
    },
  })

// Keep this here to access Burp in tests
window.Burp = Burp
