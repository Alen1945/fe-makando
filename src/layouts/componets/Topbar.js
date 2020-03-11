import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Container, Toolbar, Grid, Hidden, IconButton, Link, Badge } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ShoppingCart, LocalPizza, Input } from '@material-ui/icons'
import logo from '../../assets/logo.png'
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'white',
  },
  ButtonCategories: {
    margin: 2,
    color: '#222',
    fontWeight: 800

  },
  flexGrow: {
    flexGrow: 1
  }
}))
function Topbar (props) {
  const classes = useStyles()
  return (
    <>
      <AppBar className={classes.appBar} position='sticky'>
        <Container>
          <Grid container align='center'>
            <Grid item xs={12}>
              <Toolbar>
                <div className={classes.flexGrow} />
                <Link to='/' component={RouterLink}>
                  <img src={logo} />
                </Link>
                <div className={classes.flexGrow} />
                <Hidden mdUp>
                  <IconButton
                    className={classes.ButtonCategories}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
              </Toolbar>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12}>
                <Toolbar>
                  <div className={classes.flexGrow} />
                  <IconButton color='error'>
                    <Badge badgeContent={4} color='error'>
                      <ShoppingCart className={classes.ButtonCategories} />
                    </Badge>
                  </IconButton>
                  <IconButton className={classes.ButtonCategories}>
                    <Input />
                  </IconButton>
                </Toolbar>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </AppBar>
    </>
  )
}

export default Topbar
