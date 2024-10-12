import { Outlet } from 'react-router-dom'
import { Box } from 'design-system/components'
import { themeClassName } from 'design-system/theme'

export function Root() {
  return (
    <Box className={themeClassName} p={32}>
      <Outlet />
    </Box>
  )
}
