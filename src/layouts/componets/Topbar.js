import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Button, Hidden, IconButton, Link, Badge } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ShoppingCart, LocalPizza, Input } from '@material-ui/icons'
import logo from '../assets/logo.png'
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'white',
    boxShadow: '1px 1px 2px'
  },
  ButtonCategoris: {
    margin: 2,
    color: '#333'

  },
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  }
}))
function Topbar (props) {
  const classes = useStyles()
  return (
    <>
      <AppBar className={classes.appBar} elevation={5}>
        <Toolbar>
          <Link to='/' component={RouterLink}>
            <img src={logo} />
          </Link>
          <div className={classes.flexGrow} />
          <Hidden smDown>
            <Button className={classes.ButtonCategoris} variant='outlined' startIcon={<LocalPizza />}>
              Pizza
            </Button>
            <Button className={classes.ButtonCategoris} variant='outlined' startIcon={<LocalPizza />}>
              Salads
            </Button>
            <Button className={classes.ButtonCategoris} variant='outlined' startIcon={<LocalPizza />}>
              Meat
            </Button>
          </Hidden>
          <div className={classes.flexGrow} />
          <Hidden smDown>
            <IconButton color='error'>
              <Badge badgeContent={4} color='error'>
                <ShoppingCart color='primary'/>
              </Badge>
            </IconButton>
            <IconButton color='primary'>
              <Input />
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Topbar
