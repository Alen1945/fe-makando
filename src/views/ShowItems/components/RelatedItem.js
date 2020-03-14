import React from 'react'
import { Link } from 'react-router-dom'
import {
  CardContent, Card, CardMedia, Avatar,
  Box, CardActions,
  Typography, Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {AddShoppingCart} from '@material-ui/icons'

const useStyles = makeStyles({
  avatar: {
    height: '100px',
    width: '100px'
  }
})

export default function RelatedItem (props) {
  const classes = useStyles()
  return (
    <Card align='center' elevation={2} style={{paddingTop:'20px'}}>
      <Avatar alt={props.name} src={(process.env.REACT_APP_API_URL + '/' + props.images)} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant='subtite1' color='textSecondary'>
          {props.name}
        </Typography>
        <Typography gutterBottom variant='h6'>
          Rp. {parseFloat(props.price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions style={{marginTop:'-15px'}}>
        <Button size='small' color='secondary' variant='contained' width='100%'>
          <AddShoppingCart />
        </Button>
        <Button size='small' color='primary' variant='outlined' width='100%' to={`/items/${props._id}`} component={Link}>
          Details
        </Button>
      </CardActions>
    </Card>
  )
}