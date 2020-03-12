import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import MainLayout from './layouts/Main'
import MinimalLayout from './layouts/Minimal'
import Dashboard from './layouts/Dashboard'
import Home from './views/Home'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import ShowItems from './views/ShowItems'
import ShowCarts from './views/Carts'
import DashboardAdmin from './views/DashboardAdmin'
import Page404 from './views/Page404'
function App () {
  document.title = 'MakanDo'
  return (
    <Router>
      <Switch>
        <GuestRoute
          exact
          path='/'
          component={Home}
          title='Home'
          layout={MainLayout}
        />
        <GuestRoute
          exact
          path='/login'
          title='Login'
          component={SignIn}
          layout={MinimalLayout}
        />
        <GuestRoute
          exact
          path='/registras'
          title='Registrasi'
          component={SignUp}
          layout={MinimalLayout}
        />
        <GuestRoute
          exact
          path='/items'
          title='Items'
          component={ShowItems}
          layout={MainLayout}
        />
        <GuestRoute
          exact
          path='/carts'
          title='Cart'
          component={ShowCarts}
          layout={MainLayout}
        />
        <GuestRoute
          exact
          path='/admin'
          title='DashBoard'
          component={DashboardAdmin}
          layout={Dashboard}
        />
        <GuestRoute
          exact
          path='/admin/:page'
          title='DashBoard'
          component={DashboardAdmin}
          layout={Dashboard}
        />
        <GuestRoute
          title='Page Not Found'
          component={Page404}
          layout={MainLayout}
        />
      </Switch>
    </Router>
  )
}

export default App
