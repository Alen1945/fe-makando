import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Container, Toolbar, ExpansionPanel, ExpansionPanelDetails, Button, IconButton, Link, Badge } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ShoppingCart, Close, Input } from '@material-ui/icons'
import logo from '../../assets/logo.png'
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'white',
    boxShadow: '0px 1px 8px #999'
  },
  ButtonCustom: {
    margin: 2,
    color: '#222',
    fontWeight: 800

  },
  expandPanelIcon: {
    postion:'absolute',
    top: 0,
    right:0
  },
  flexGrow: {
    flexGrow: 1
  }
}))
function Topbar (props) {
  const classes = useStyles()
  const {isLogin} = props
  const [toolbarExpand, setToolbarExpand] = React.useState(false)
  const expandedIcon = () => {
    if (toolbarExpand) {
      return (<Close />)
    } else {
      return (<MenuIcon />)
    }
  }
  const handleExpand = () => {
    setToolbarExpand(!toolbarExpand)
  }
  return (
    <>
      <AppBar className={classes.appBar} position='sticky' elevation={0}>
        <Container maxWidth='lg' elevation={0}>
          <Toolbar style={{position:'relative'}}>
            <div className={classes.flexGrow} />
            <Link to='/' component={RouterLink}>
              <img alt='logo' src={logo} />
            </Link>
            <div className={classes.flexGrow} />
            <IconButton onClick={handleExpand} className={clsx(classes.ButtonCustom, classes.expandPanelIcon)}>{expandedIcon()}</IconButton>
          </Toolbar>
          <ExpansionPanel expanded={toolbarExpand} elevation={0}>
            <div />
            <ExpansionPanelDetails>
              <div className={classes.flexGrow} />
              <IconButton color='error'>
                <Badge badgeContent={4} color='error'>
                  <ShoppingCart className={classes.ButtonCustom} />
                </Badge>
              </IconButton>
              {
                isLogin ? (
                  <IconButton className={classes.ButtonCustom} to='/logout' component={RouterLink}>
                    <Input />
                  </IconButton>
                ) : (
                  <Button>Login</Button>
                )
              }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Container>
      </AppBar>
    </>
  )
}

export default Topbar
