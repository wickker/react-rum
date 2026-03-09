import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

type FetchState = {
  loading: boolean
  error: string | null
  data: unknown
}

function JsonPage({ title, endpoint }: { title: string; endpoint: string }) {
  const [state, setState] = useState<FetchState>({
    loading: true,
    error: null,
    data: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const json = await response.json()
        if (!cancelled) {
          setState({ loading: false, error: null, data: json })
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : 'Failed to fetch data'
          setState({ loading: false, error: message, data: null })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [endpoint])

  return (
    <section>
      <h1>{title}</h1>
      <p>
        Endpoint: <code>{endpoint}</code>
      </p>
      {state.loading && <p>Loading...</p>}
      {state.error && <p className="error">Error: {state.error}</p>}
      {state.data !== null && (
        <pre>{JSON.stringify(state.data, null, 2)}</pre>
      )}
    </section>
  )
}

function Home() {
  return <h1>Welcome to Dian&apos;s App</h1>
}

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/health">Health</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <JsonPage
              title="Users"
              endpoint="https://dian.hicloud.guru/users"
            />
          }
        />
        <Route
          path="/health"
          element={
            <JsonPage
              title="Health"
              endpoint="https://dian.hicloud.guru/health"
            />
          }
        />
      </Routes>
    </div>
  )
}
