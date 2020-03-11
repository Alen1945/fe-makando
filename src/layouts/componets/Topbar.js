import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Container, Toolbar, Button, Hidden, IconButton, Link, Badge } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ShoppingCart, LocalPizza, Input } from '@material-ui/icons'
import logo from '../../assets/logo.png'
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow:'none'
  },
  ButtonCategoris: {
    margin: 2,
    color: 'white',
    fontWeight: 800

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
      <AppBar className={classes.appBar}>
        <Container>
          <Toolbar>
            <Link to='/' component={RouterLink}>
              <img src={logo} />
            </Link>
            <div className={classes.flexGrow} />
            <Hidden smDown>
              <Button className={classes.ButtonCategoris} color='secondary' startIcon={<LocalPizza />}>
                Pizza
              </Button>
              <Button className={classes.ButtonCategoris} color='secondary' startIcon={<LocalPizza />}>
                Salads
              </Button>
              <Button className={classes.ButtonCategoris} color='secondary' startIcon={<LocalPizza />}>
                Meat
              </Button>
            </Hidden>
            <div className={classes.flexGrow} />
            <Hidden smDown>
              <IconButton color='error'>
                <Badge badgeContent={4} color='error'>
                  <ShoppingCart className={classes.ButtonCategoris} />
                </Badge>
              </IconButton>
              <IconButton className={classes.ButtonCategoris}>
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
        </Container>
      </AppBar>
    </>
  )
}

export default Topbar
