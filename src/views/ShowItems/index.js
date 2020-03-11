import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardMedia, 
  Dialog,DialogContentText,
  DialogContent, DialogTitle,
  DialogActions, CardContent,
  CardActionArea, CardActions,
  Typography, Button, Grid,
  Container, TextField} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import image from '../Home/assets/makan2.jpg'
const useStyles = makeStyles({
  listCategories: {
    borderBottom: '1px solid #ccc',
    minHeight: '100px',
    marginBottom: '50px'
  },
  buttonCategories:{
    marginLeft: '10px',
    width: '120px',
    fontWeight:600
  },
  grid: {
    height: '100%',
    padding:'50px'
  },
  listItems:{
    minHeight:'200px'
  },
  Media: {
    borderRadius:'50%',
    maxWidth:'200px',
    maxHeight: '200px',
    margin:'0 auto'
  }
})
function ShowItems (props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={classes.listCategories}>
        <Container>
          <Grid container className={classes.grid}>
            <Button variant='contained' color='secondary' className={classes.buttonCategories}> Show All </Button>
            <Button variant='outlined' color='secondary' className={classes.buttonCategories}> Meat </Button>
            <Button variant='outlined' color='secondary' className={classes.buttonCategories}> Spicy </Button>
            <Button variant='outlined' color='secondary' className={classes.buttonCategories}> Veg </Button>
          </Grid>
        </Container>
      </div>
      <div className={classes.listItems}>
        <Container>
          <Grid container justify='center' spacing={8}>
            {
              [1,2,3,4,5,6,7,8].map((v,i) => (
                <Grid item key={i} sm={3} xs={4}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        alt='Contemplative Reptile'
                        height='200'
                        image={image}
                        title='Contemplative Reptile'
                        className={classes.Media}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        Seblak
                      </Typography>
                      <p>Price: $500-</p>
                    </CardContent>
                    <CardActions>
                      <Button size='small' color='primary' onClick={handleClickOpen}>
                        ADD To Cart
                      </Button>
                      <Button size='small' color='primary'>
                        Show Reviews
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle id='responsive-dialog-title'>How Many Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
              <TextField id='outlined-basic' fullWidth margin='normal' label='Total Item' variant='outlined' />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  )
}

export default ShowItems
