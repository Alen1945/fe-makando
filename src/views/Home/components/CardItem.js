import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import img1 from '../assets/makan1.jpg'

export default function CardItem (props) {
  return (
    <Card elevation={1}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Ayam'
          image={img1}
          title='Ayam'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Ayam
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='secondary' variant='contained' width='100%'>
          <AddShoppingCartIcon />
        </Button>
        <Button size='small' color='primary' variant='outlined' width='100%'>
          Details and Reviews
        </Button>
      </CardActions>
    </Card>
  )
}
