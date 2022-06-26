import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { UserProvider } from 'providers'
import Router from 'router'

import './i18n'
import './styles/global.css'
import './styles/antd.css'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (rootElement != null) {
  const root = createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UserProvider>
          <Router />
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
