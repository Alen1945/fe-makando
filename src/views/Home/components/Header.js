import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { TextField, Grid, Typography, Button, Box } from '@material-ui/core'
import img1 from '../assets/makan1.jpg'
import img2 from '../assets/makan2.jpg'

const useStyles = makeStyles(() => ({
  imageContainer: {
    width: '100%',
    height: '100vh'
  },
  itemDescription: {
    position: 'absolute',
    width: '350px',
    height: '400px',
    paddingLeft:'20px',
    paddingRight:'20px',
    textAlign: 'center',
    borderRadius: '10px',
    background: '#fdfbfb',
    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    top: '120px',
    left: '50px',
    color: '#f50057'
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const [searchKey, setSearchKey] = React.useState('')
  const handleSearchInput = (e) => {
    setSearchKey(e.target.value)
  }
  const items = [
    {
      img: img1
    },
    {
      img: img2
    }
  ]
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', marginBottom: '50px' }}>
      <Box component={Carousel} indicators={0} autoPlay={1}>
        {items.map((item, i) => (
          <Grid
            elevation={0} className={classes.imageContainer}
            style={{ background: `url(${item.img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            key={i}
          />
        ))}
      </Box>
      <Grid container alignItems='center' className={classes.itemDescription} justify='center'>
        <Grid style={{ position: 'relative' }}>
          <Typography variant='h2'><span style={{ color: 'white', background: '#f50057', padding: '5px', fontWeight: 600 }}>Makan</span>Do</Typography>
          <Typography variant='h5' style={{ margin: '10px' }}>Mau Makan Apa Kali Ini</Typography>
          <TextField value={searchKey} onChange={handleSearchInput} label='Search Item...' variant='outlined' margin='dense' style={{ marginBottom: '10px' }} />
          <Button color='secondary' variant='contained' to={!searchKey ? '/items' : `/items?s=${searchKey}`} component={Link}>Search</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
