import Error from '@/assets/images/Error.svg'
import '@/assets/styles/index.scss'
import { ThemeProvider } from '@emotion/react'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Router } from './components/Router/Router.tsx'
import { RouterGuard } from './components/Router/RouterGuard.tsx'
import { store } from './data/store.ts'
import { DefaultView } from './layouts/Default/DefaultView.tsx'
import { ErrorBoundary } from './layouts/Error/ErrorBoundary.tsx'
import { appRoot, constants, history } from './utils/global.ts'
import { initialize } from './utils/initialize.ts'
import { routes } from './utils/routes.ts'
import { useTheme } from './utils/theme.ts'
import { Navigate } from 'react-router-dom'

initialize()

function AppRoot() {
  const theme = useTheme()
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <SnackbarProvider />
            <Router history={history} basename={constants.APP_BASE}>
              <RouterGuard routes={[...routes, {
                path: '*',
                element: <DefaultView msg='资源不存在' type='error' img={Error} />
              }, {
                path: '/',
                element: <Navigate to={`/index`} />
              }]} />
            </Router>
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(appRoot).render(<AppRoot />)
