import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeUserLogin } from '../../store/actions'
function Logout (props) {
  props.removeUserLogin()
  return (<Redirect to='/login' />)
}

export default connect(null, { removeUserLogin })(Logout)
