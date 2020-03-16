import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Paper,Grid, Typography, Button } from '@material-ui/core'
import img1 from '../assets/makan1.jpg'
import img2 from '../assets/makan2.jpg'

const useStyles = makeStyles(() => ({
  carousel: { marginBottom: '50px' },
  imageContainer: {
    width: '100%',
    height: '90vh',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'center center'
  },
  itemDescription: {
    position: 'absolute',
    backgroundColor:'rgba(0, 0, 0, 0.4)',
    padding:'20px',
    borderRadius:'10px',
    textAlign:'center',
    bottom:0,
    top:0,
    left:0,
    right:0,
    fontWeight:800,
    padding:'20px',
    color: 'white'
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const items = [
    {
      img: img1
    },
    {
      img: img2
    }
  ]
  return (
    <Carousel indicators={0} autoPlay={1} animation='slide' className={classes.carousel}>
      {
        items.map((item, i) => (
          <Item item={item} key={i} />
        ))
      }
    </Carousel>
  )
}
function Item (props) {
  const classes = useStyles()
  return (
    <Paper elevation={0} className={classes.imageContainer}>
      <img src={props.item.img} className={classes.image} />
      <Grid container alignItems='center' justify='center' className={classes.itemDescription}>
        <Grid>
          <Typography variant='h2'><span style={{color:'yellow', fontWeight:600}}>Makan</span>Do</Typography>
          <Typography variant='h5' style={{margin:'10px'}}>Food Delivery And Order</Typography>
          <Button color='secondary' variant='contained' to='/items' component={Link}>Show Items</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Header
