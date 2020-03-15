import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Container, Toolbar, IconButton, Link } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Close } from '@material-ui/icons'
import logo from '../../assets/logo.png'
import DashboardSideRes from './DashboardSideRes'
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'white',
  },
  ButtonCategories: {
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
function DashboardNavRes (props) {
  const classes = useStyles()
  const [toolbarExpand, setToolbarExpand] = React.useState(0)
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
      <AppBar className={classes.appBar} style={{zIndex:'9999'}} position='sticky'>
        <Container>
          <Toolbar style={{position:'relative'}}>
            <div className={classes.flexGrow} />
            <Link to='/' component={RouterLink}>
              <img alt='logo' src={logo} />
            </Link>
            <div className={classes.flexGrow} />
            <IconButton onClick={handleExpand} className={clsx(classes.ButtonCategories, classes.expandPanelIcon)}>{expandedIcon()}</IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <DashboardSideRes setOpen={setToolbarExpand} open={toolbarExpand} />
    </>
  )
}

export default DashboardNavRes
