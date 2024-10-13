import { Outlet } from 'react-router-dom'
import { VStack, Box } from 'design-system/components'
import { themeClassName } from 'design-system/theme'

export function Root() {
  return (
    <VStack
      as="span"
      className={themeClassName}
      p={32}
      gap={12}
      mx={12}
      m={99}
      onClick={(event) => {
        console.log(event satisfies React.MouseEvent<HTMLSpanElement>)
      }}
    >
      <Box
        p={32}
        m={99}
        onClick={(event) => {
          console.log(event satisfies React.MouseEvent<HTMLDivElement>)
        }}
      />
      <Box p={24} />
      <Outlet />
    </VStack>
  )
}
