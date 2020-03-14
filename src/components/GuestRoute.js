import React from 'react'
import { Route as RouterLink } from 'react-router-dom'
function CustomRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, isLogin, ...anotherProps } = props
  return (
    <RouterLink
      {...anotherProps}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} isLogin={isLogin} />
        </Layout>
      )}
    />
  )
}

export default CustomRoute
