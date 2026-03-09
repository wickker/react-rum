import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import { datafluxRum } from '@cloudcare/browser-rum';

datafluxRum.init({
    applicationId: 'dian_rum_test',
    site: 'https://id1-rum-openway.truewatch.com',
    clientToken: '007419b3038445b9b0d909592f6ec82c',
    env: 'production',
    version: '1.0.0',
    service: 'browser',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    compressIntakeRequests: true,
    trackUserInteractions: true,
    allowedTracingOrigins: ['https://dian.hicloud.guru', 'https://react-rum-5529d.sevalla.page'],  // Not required; allow all requests to be injected into the header required by the trace collector. It can be the origin of the request or it can be regular.
});
datafluxRum.startSessionReplayRecording()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
