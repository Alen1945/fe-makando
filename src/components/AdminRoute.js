import React from 'react'
import { Route as RouterLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'

function AdminRoute (props) {
  document.title = props.title
  const { layout: Layout, component: Component, token, ...anotherProps } = props
  if (token) {
    const role = jwt.decode(token).role
    if (role && (role === 2 || role === 3)) {
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
    } else {
      return <Redirect to='/403?' />
    }
  }
  return <Redirect to='/login' />
}

const mapStateToProps = (state) => ({
  token: state.dataUser.token
})
export default connect(mapStateToProps)(AdminRoute)
