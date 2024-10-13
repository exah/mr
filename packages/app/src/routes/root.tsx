import { Outlet } from 'react-router-dom'
import { VStack } from 'design-system/components'
import { themeClassName } from 'design-system/theme'

export function Root() {
  return (
    <VStack className={themeClassName}>
      <Outlet />
    </VStack>
  )
}
