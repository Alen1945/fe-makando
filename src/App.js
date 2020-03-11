import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import CustomRoute from './components/CustomRoute'
import MainLayout from './layouts/Main'
import MinimalLayout from './layouts/Minimal'
import Home from './views/Home'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
function App () {
  useEffect(() => {
    document.title = 'MakanDo'
  })
  return (
    <Router>
      <Switch>
        <CustomRoute
          exact
          path='/'
          component={Home}
          layout={MainLayout}
        />
        <CustomRoute
          exact
          path='/login'
          component={SignIn}
          layout={MinimalLayout}
        />
        <CustomRoute
          exact
          path='/signup'
          component={SignUp}
          layout={MinimalLayout}
        />
      </Switch>
    </Router>
  )
}

export default App
