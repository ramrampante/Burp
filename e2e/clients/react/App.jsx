/* eslint-disable react/react-in-jsx-scope */
import Burp from '@Burp/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@Burp/react'
import ThumbnailGenerator from '@Burp/thumbnail-generator'
import RemoteSources from '@Burp/remote-sources'

import '@Burp/core/dist/style.css'
import '@Burp/dashboard/dist/style.css'
import '@Burp/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.Burp.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const BurpDashboard = new Burp({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const BurpModal = new Burp({ id: 'modal' })
  const BurpDragDrop = new Burp({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the Burp instance
  window.Burp = BurpDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" Burp={BurpDashboard} />
      <DashboardModal id="modal" open={open} Burp={BurpModal} />
      <DragDrop id="drag-drop" Burp={BurpDragDrop} />
    </div>
  )
}
