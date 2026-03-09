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
    trackInteractions: true,
    traceType: 'ddtrace', // Not required, default to ddtrace. Currently, it supports 6 types: ddtrace, zipkin, skywalking_v3, jaeger, zipkin_single_header and w3c_traceparent.
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
