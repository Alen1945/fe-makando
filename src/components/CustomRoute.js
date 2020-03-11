import React from 'react'
import { Route as RouterLink } from 'react-router-dom'
function CustomRoute (props) {
  const { layout: Layout, component: Component, ...anotherProps } = props
  return (
    <RouterLink
      {...anotherProps}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

export default CustomRoute
