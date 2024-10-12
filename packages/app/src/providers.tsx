import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function Providers() {
  return <RouterProvider router={router} />
}
