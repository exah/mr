import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Root } from './root'
import { Welcome } from './welcome'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" />,
      },
      {
        path: '/welcome',
        element: <Welcome />,
      },
    ],
  },
])
