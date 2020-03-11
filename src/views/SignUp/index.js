import React from 'react'
import { Grid, TextField, Card, CardHeader, Button, CardMedia, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import logo from '../../assets/logo.png'
const useStyles = makeStyles({
  content: {
    marginTop: '80px'
  },
  containerForm: {
    padding: '20px'
  }
})
function SignUp (props) {
  const classes = useStyles()
  return (
    <Grid container component='main' maxWidth='xs' justify='center' className={classes.content}>
      <Grid item md={5} lg={4}>
        <Card className={classes.containerForm}>
          <CardHeader style={{ textAlign: 'center' }} title={<img src={logo} />}>
          </CardHeader>
          <CardMedia>
            <form>
              <TextField id='outlined-basic' fullWidth margin='normal' label='Username' variant='outlined' />
              <TextField id='outlined-basic' fullWidth margin='normal' label='Password' variant='outlined' />
              <TextField id='outlined-basic' fullWidth margin='normal' label='Confirm Password' variant='outlined' />
              <Button
                type='submit'
                fullWidth
                size='large'
                variant='contained'
                color='primary'
              >
                <strong>Registrasi</strong>
              </Button>
            </form>
          </CardMedia>
          <CardActions>
            <Button size='medium' color='primary'>
              Login
            </Button>
        </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
export default SignUp
