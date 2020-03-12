import React from 'react'
import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MoveToInbox, Mail } from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  sideNav: {
    width:'270px',
    paddingTop:'80px'
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
          <ListItem button>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary='Categories' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary='Restaurants' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary='Items' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MoveToInbox /></ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Grid>
    </Drawer>
  )
}
