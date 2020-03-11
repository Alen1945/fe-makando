import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import CustomRoute from './components/CustomRoute'
import Home from './views/Home'
import Sign from './views/SignIn'
import MainLayout from './layouts/Main'
import MinimalLayout from './layouts/Minimal'

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
          component={Sign}
          layout={MinimalLayout}
        />
      </Switch>
    </Router>
  )
}

export default App
