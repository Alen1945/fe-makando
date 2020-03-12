import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import CustomRoute from './components/CustomRoute'
import MainLayout from './layouts/Main'
import MinimalLayout from './layouts/Minimal'
import Dashboard from './layouts/Dashboard'
import Home from './views/Home'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import ShowItems from './views/ShowItems'
import ShowCarts from './views/Carts'
import DashboardAdmin from './views/DashboardAdmin'
function App () {
  document.title = 'MakanDo'
  return (
    <Router>
      <Switch>
        <CustomRoute
          exact
          path='/'
          component={Home}
          title='Home'
          layout={MainLayout}
        />
        <CustomRoute
          exact
          path='/login'
          title='Login'
          component={SignIn}
          layout={MinimalLayout}
        />
        <CustomRoute
          exact
          path='/registras'
          title='Registrasi'
          component={SignUp}
          layout={MinimalLayout}
        />
        <CustomRoute
          exact
          path='/items'
          title='Items'
          component={ShowItems}
          layout={MainLayout}
        />
        <CustomRoute
          exact
          path='/carts'
          title='Cart'
          component={ShowCarts}
          layout={MainLayout}
        />
        <CustomRoute
          exact
          path='/admin'
          title='DashBoard'
          component={DashboardAdmin}
          layout={Dashboard}
        />
        <CustomRoute
          exact
          path='/admin/:page'
          title='DashBoard'
          component={DashboardAdmin}
          layout={Dashboard}
        />
      </Switch>
    </Router>
  )
}

export default App
