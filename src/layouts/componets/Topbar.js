import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Container, Toolbar, Drawer, Button, IconButton, Link, Badge } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ShoppingCart, Close, Input } from '@material-ui/icons'
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'
import { connect } from 'react-redux'
const useStyles = makeStyles(() => ({
  appBar: {
    paddingTop: '10px',
    paddingBottom: '10px',
    background: 'linear-gradient(180deg,#353232d4,#3532328a,#35323214, transparent)',
    transition: '.5s ease-out background-color',
    overflow: 'hidden'
  },
  appBarWhite: {
    background: '#fff',
    boxShadow: '5px 0px 5px rgba(0,0,0,.4)'
  },
  ButtonCustom: {
    margin: 2,
    color: 'white',
    fontWeight: 800
  },
  BtnGray: {
    color: '#444'
  },
  expandPanelIcon: {
    postion: 'absolute',
    top: 0,
  },
  flexGrow: {
    flexGrow: 1
  }
}))
function Topbar (props) {
  const classes = useStyles()
  const { isLogin, totalItem, dataProfile } = props
  const [toolbarExpand, setToolbarExpand] = React.useState(false)
  const [isTop, setIsTop] = React.useState(1) 
  const handleExpand = () => {
    setToolbarExpand(!toolbarExpand)
  }
  document.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      setIsTop(1)
    } else {
      setIsTop(0)
    }
  })
  return (
    <>
      <AppBar className={clsx(classes.appBar, (!isTop && classes.appBarWhite),(!props.isHome && classes.appBarWhite))} position={props.isHome ? 'fixed' : 'sticky'} elevation={0}>
        <Container maxWidth='lg' elevation={0}>
          <Toolbar style={{ position: 'relative' }}>
            <div className={classes.flexGrow} />
            <Link to='/' component={RouterLink}>
              <img alt='logo' height='48px' src={isTop && props.isHome ? logo2 : logo} />
            </Link>
            <div className={classes.flexGrow} />
            <IconButton onClick={handleExpand} className={clsx(classes.ButtonCustom, classes.expandPanelIcon, (!isTop && classes.BtnGray), (!props.isHome && classes.BtnGray))}><MenuIcon /></IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer open={toolbarExpand} anchor='top' onClose={() => setToolbarExpand(0)}>
        <Container style={{ paddingTop: '10px', paddingBottom: '10px'}}>
          <Toolbar>
            <div className={classes.flexGrow} />
            <IconButton color='error' to='/carts' component={RouterLink}>
              <Badge color='error' badgeContent={totalItem}>
                <ShoppingCart className={clsx(classes.ButtonCustom, classes.BtnGray)} />
              </Badge>
            </IconButton>
            {
              isLogin ? (
                <>
                  <Button size='small' variant='outlined' color='primary' to='/profile' component={RouterLink} sizeSmall>Profile</Button>&nbsp;
                  {
                    dataProfile.is_admin &&  <><Button size='small' variant='outlined' color='primary' to='/restaurant/admin' component={RouterLink} sizeSmall>Admin</Button>&nbsp;</>
                  }
                  {
                    dataProfile.is_superadmin &&  <><Button size='small' variant='outlined' color='primary' to='/admin' component={RouterLink} sizeSmall>SuperAdmin</Button>&nbsp;</>
                  }
                  <IconButton className={clsx(classes.ButtonCustom, classes.BtnGray)} to='/logout' component={RouterLink}>
                    <Input />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button size='small' variant='outlined' color='primary' to='/login' component={RouterLink} sizeSmall>Login</Button>
                </>
              )
            }
            <IconButton onClick={handleExpand} className={clsx(classes.ButtonCustom, classes.BtnGray)}><Close /></IconButton>
          </Toolbar>
        </Container>
      </Drawer>
    </>
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.dataUser.isLogin,
  dataProfile: state.dataUser.dataProfile,
  totalItem: state.dataCart.totalTypeItems
})
export default connect(mapStateToProps)(Topbar)
