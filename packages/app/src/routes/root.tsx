import { Outlet } from 'react-router-dom'
import { Stack } from 'design-system/components'
import { themeClassName, theme } from 'design-system/theme'

export function Root() {
  return (
    <Stack
      className={themeClassName}
      p={32}
      style={{
        backgroundColor: theme.colors['page-background'],
        color: theme.colors['page-text'],
      }}
    >
      <Outlet />
    </Stack>
  )
}
