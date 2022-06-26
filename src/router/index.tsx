import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageWrapper, { Login } from 'pages'
import routes from 'router/routes'

function Router(): ReactElement {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path={routes.login.path} element={<Login />} />
          <Route path="" element={<Login />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  )
}

export { routes }
export default Router
