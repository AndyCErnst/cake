import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { C_PRIMARY, C_PRIMARY_DARK, C_PRIMARY_LIGHT, C_SECONDARY, C_SECONDARY_DARK, C_SECONDARY_LIGHT, C_SUCCESS } from './colors'
import './index.css'
import { PageLayout } from './Layouts'
import { ErrorPage } from './Pages/ErrorPage'
import { GraphPage } from './Pages/GraphPage'
import { LandingPage } from './Pages/LandingPage'
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage'
import { LearningPage } from './Pages/LearningPage/LearningPage'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, "Segoe UI", sans-serif',
    h1: {
      fontSize: '2rem'
    },
    h2: {
      fontSize: '1.5rem'
    },
    h3: {
      fontSize: '1.17rem'
    },
  },
  palette: {
    primary: {
      light: C_PRIMARY_LIGHT,
      main: C_PRIMARY,
      dark: C_PRIMARY_DARK,
    },
    secondary: {
      light: C_SECONDARY_LIGHT,
      main: C_SECONDARY,
      dark: C_SECONDARY_DARK,
    },
    success: {
      main: C_SUCCESS,
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 18,
        }
      }
    },
  },
})

export const router = createBrowserRouter([
  // Landing page uses a custom `PageLayout`
  { path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
  {
    path: '/',
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/graph',
        element: <GraphPage />,
      },
      {
        path: '/learn/:step?',
        element: <LearningPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
