import '@testing-library/jest-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { act } from 'react-dom/test-utils'

import { UserProvider } from 'providers'

import PageWrapper from 'pages'

const queryClient = new QueryClient()
let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

const ComponentWrapper = ({ children }): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
  return act(() => {
    ReactDOM.createRoot(container).render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <PageWrapper>{children}</PageWrapper>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>,
    )
  })
}

export default ComponentWrapper
