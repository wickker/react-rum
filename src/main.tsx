import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import { datafluxRum } from '@cloudcare/browser-rum';

datafluxRum.init({
    applicationId: 'dian_rum',
    site: 'https://id1-rum-openway.truewatch.com',
    clientToken: '2c84ee66383f4cb781e51c89533fbff6',
    env: 'production',
    version: '1.0.0',
    service: 'browser',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    compressIntakeRequests: true,
    trackUserInteractions: true,
    allowedTracingOrigins: ['https://dian.hicloud.guru']
});

datafluxRum.startSessionReplayRecording()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
