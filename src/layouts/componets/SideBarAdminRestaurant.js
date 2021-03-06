import React from 'react'
import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Dashboard, PeopleAlt, Fastfood, Input, AccountCircle, Home } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  sideNav: {
    width: '270px',
    paddingTop: '80px'
  }
})
export default function DashboardSide (props) {
  const closses = useStyles()
  const handleClose = (e) => {
    props.setOpen(0)
  }
  return (
    <Drawer open={props.open} onClose={handleClose}>
      <Grid justify='center' maxWidht='xl' container className={closses.sideNav}>
        <List>
          <ListItem button to='/' component={Link}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button to='/restaurant/admin' component={Link}>
            <ListItemIcon><Fastfood /></ListItemIcon>
            <ListItemText primary='Items' />
          </ListItem>
          <ListItem button to='/profile' component={Link}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem button to='/logout' component={Link}>
            <ListItemIcon><Input /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Grid>
    </Drawer>
  )
}
