import React from 'react'
import CardProfile from './components/CardProfile'
import CardEditProfile from './components/CardEditProfile'
import { Link } from 'react-router-dom'
import {
  Grid, Container, Paper, Typography, Button,
  Tabs, Tab, Card, CardContent, CardActions, Snackbar, Hidden, Avatar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import TabPanel from '../../components/TabPanel'
import { CalendarToday } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import backgroundProfile from '../../assets/BackProfile.png'
import getData from '../../helpers/getData'
import { connect } from 'react-redux'
import { setUserProfile } from '../../store/actions'
const useStyles = makeStyles({
  expanded: {
    maxHeight: '350px',
    overflowX: 'scroll',
    overflowY: 'hidden'
  }
})
function Profile (props) {
  console.log(backgroundProfile)
  const { userData, setUserData } = props
  const classes = useStyles()
  const [userPic, setUserPic] = React.useState('')
  const [userReview, setUserReviews] = React.useState([])
  const [userTransaction, setUserTransaction] = React.useState([])
  const [value, setValue] = React.useState(0)
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [statusEdit, setStatusEdit] = React.useState({
    profile: false,
    balance: false
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleClose = () => {
    setMsg({ display: 0 })
  }

  const getUserData = async () => {
    try {
      const response = await getData('/profile')
      setUserData(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }

  const getReviews = async () => {
    try {
      const response = await getData('/reviews?sort[created_at]=1')
      console.log(response)
      setUserReviews(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const getHistory = async () => {
    try {
      const response = await getData('/history?sort[created_at]=1')
      console.log(response)
      setUserTransaction(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }

  React.useEffect(() => {
    getUserData()
    getReviews()
    getHistory()
  }, [statusEdit, userPic])
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Container style={{ marginTop: '50px' }}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={12} sm={9} md={5} component={Card} elevation={2} style={{ position: 'relative', overflow: 'hidden' }} >
            <CardProfile userPic={userPic} userData={userData} statusEdit={statusEdit} setStatusEdit={setStatusEdit} setMsg={setMsg} />
            <CardEditProfile setUserPic={setUserPic} userData={userData} setUserData={setUserData} statusEdit={statusEdit} setStatusEdit={setStatusEdit} setMsg={setMsg} />
          </Grid>
          <Hidden smDown>
            <Grid style={{paddingLeft:'60px'}}>
              <Typography variant='h5' align='right' color='textSecondary'> We Try to</Typography>
              <Typography variant='h4' align='right' color='textSecondary' style={{marginBottom:'20px'}}> Make You Life Easier</Typography>
              <img alt='img' src={backgroundProfile} style={{width:'350px'}}/>
            </Grid>
          </Hidden>
        </Grid>
        <Paper style={{ marginTop: '40px' }}>
          <Tabs
            indicatorColor='secondary'
            value={value}
            textColor='primary'
            onChange={handleChange}
            aria-label='disabled tabs example'
          >
            <Tab label='History Transaction' />
            <Tab label='Recently added Reviews' />
          </Tabs>
        </Paper>
        <Grid>
          <TabPanel value={value} index={0}>
            {userTransaction && userTransaction.map((histransaction) => (
              <div key={histransaction}>
                <Paper style={{marginBottom:'10px', padding:'5px', paddingLeft:'20px'}}>
                  <Typography color='primary' component='p'>
                    <CalendarToday /> At {new Date(histransaction.created_at).toDateString()}
                  </Typography>
                  <Typography component='body1' color='textSecondary'>
                    Total Prices Rp. {histransaction.total_price}
                  </Typography>
                </Paper>
                <Grid item container justify='center' spacing={2}>
                  {
                    histransaction.listItem.map(v => (
                      <Grid key={v.id} item xs={3}>
                        <Card align='center' elevation={1} style={{paddingTop:'20px'}}>
                          <Avatar style={{height:'100px', width:'100px'}} alt={v.name} src={(process.env.REACT_APP_API_URL + '/' + v.images)}/>
                          <CardContent>
                            <Typography gutterBottom variant='h6' color='textSecondary'>
                              {v.name}
                            </Typography>
                          </CardContent>
                          <CardActions style={{ marginTop: '-15px' }}>
                            <Grid container justify='center'>
                              <Button size='small' color='primary' variant='contained' to={`/items/${v.id}`} component={Link}>
                                Order Again
                              </Button>&nbsp;&nbsp;
                              <Button size='small' color='primary' variant='outlined'>
                                Create Review
                              </Button>
                            </Grid>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>
              </div>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid align='center' justify='center' sytle={{ marginTop: '10px' }}>
              {userReview && userReview.map((review) => (
                <Card key={review._id} style={{ margin: '5px' }}>
                  <CardContent>
                    <Typography variant='body1' component='h2'>
                      Review on <strong>{review.name}</strong>
                    </Typography>
                    <Typography color='textSecondary' varianat='p' gutterBottom>
                      at {new Date(review.created_at).toDateString()}
                    </Typography>
                    <Typography className={classes.pos} component='p' color='textSecondary'>
                      Rating {review.rating}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      {review.review}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </TabPanel>
        </Grid>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  userData: state.dataUser.dataProfile
})
const mapDispatchToProps = {
  setUserData: setUserProfile
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
