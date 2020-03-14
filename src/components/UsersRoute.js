import React from 'react'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { Route as RouterLink, Redirect } from 'react-router-dom'
function CustomRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, isLogin, setIsLogin, ...anotherProps } = props
  if (cookie.get('tokenm4k4nd0')) {
    const role = jwt.decode(cookie.get('tokenm4k4nd0')).role
    if (role && role >= 1 && role <= 3) {
      return (
        <RouterLink
          {...anotherProps}
          render={(matchProps) => (
            <Layout isLogin={isLogin}>
              <Component {...matchProps} isLogin={isLogin} setIsLogin={setIsLogin} />
            </Layout>
          )}
        />
      )
    } else {
      return <Redirect to='/login?'/>
    }
  }
  return <Redirect to='/login'/>
}

export default CustomRoute
