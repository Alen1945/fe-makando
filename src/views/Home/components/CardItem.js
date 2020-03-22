import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {Store} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  avatar: {
    height: '100px',
    width: '100px'
  }
})
export default function CardItem (props) {
  const [elevation, setElevation] = React.useState(1)
  const classes = useStyles()
  const handleHover = (e) => {
    setElevation(4)
  }
  const handleLeave = (e) => {
    setElevation(1)
  }
  return (
    <Card align='center' style={{ padding: '10px' }} elevation={elevation} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <Avatar alt={props.detailItem.name} src={process.env.REACT_APP_API_URL + '/' + props.detailItem.images} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant='subtite1' color='primary'>
          {props.detailItem.name}
        </Typography>
        <Typography gutterBottom variant='h6'>
          Rp. {parseFloat(props.detailItem.price).toFixed(2)}
        </Typography>
        <Typography gutterBottom variant='subtite2' style={{display:'block', textDecoration:'none'}} color='primary' to={'/restaurants/'+props.detailItem.id_restaurant} component={Link}>
          <Store style={{ display: 'inline-flex',verticalAlign: 'bottom'}}/> {props.detailItem.name_restaurant}
        </Typography>
        <Typography gutterBottom variant='p' color='textSecondary'>
          {props.detailItem.name_category}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size='small' color='secondary' variant='contained'>
          <AddShoppingCart />
        </Button> */}
        <Grid container justify='center'>
          <Button size='small' color='secondary' variant='contained' to={`/items/${props.detailItem._id}`} component={Link}>
          Details
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}
