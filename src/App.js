import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import CustomRoute from './components/CustomRoute'
import Home from './views/Home'
import MainLayout from './layouts/Main'

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
      </Switch>
    </Router>
  )
}

export default App
