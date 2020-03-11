import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/styles'
import { Paper } from '@material-ui/core'
import img1 from '../assets/makan1.jpg'
import img2 from '../assets/makan2.jpg'

const useStyles = makeStyles(() => ({
  carousel: { marginBottom: '50px' },
  imageContainer: {
    width: '100%',
    height: '75vh',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'center center'
  },
  itemDescription: {
    position: 'absolute'
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
    <Carousel indicators={0} autoPlay={1} className={classes.carousel}>
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
    <Paper elevation={3} className={classes.imageContainer}>
      <img src={props.item.img} className={classes.image} />
      <div className={classes.itemDescription}>

      </div>
    </Paper>
  )
}

export default Header
