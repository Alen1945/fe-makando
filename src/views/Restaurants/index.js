import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import {
  Card, CardContent, CardActions,
  Typography, Button, Grid, Avatar, Container
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import getData from '../../helpers/getData'
const useStyles = makeStyles({
  buttonCategories: {
    marginLeft: '10px',
    width: '120px',
    fontWeight: 600
  },
  grid: {
    height: '100%',
    padding: '50px'
  },
  listItems: {
    marginTop:'20px',
    minHeight: '200px'
  },
  avatar: {
    height: '100px',
    width: '100px'
  }
})

function ShowRestaurants (props) {
  const classes = useStyles()
  const [dataRestaurants, setDataRestaurants] = React.useState({})
  const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }
  const getRestaurants = async (page, category) => {
    try {
      const condition = `limit=5&sort[_id]=1&page=${page}`
      const url = `/browse-restaurants?${condition}`
      const response = await getData(url)
      console.log(response.data)
      setDataRestaurants(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getRestaurants(page)
  }, [page])
  return (
    <>
      <div className={classes.listItems}>
        <Container>
          <Grid container justify='center' spacing={2} alignItems='stretch'>
            {
              dataRestaurants.data ? dataRestaurants.data.map((resto) => (
                <Grid item key={resto._id} md={2} sm={4} xs={6}>
                  <Card align='center' style={{ padding: '10px' }} style={{height:'100%'}}>
                    <Avatar alt={resto.name} src={process.env.REACT_APP_API_URL + '/' + resto.logo} className={classes.avatar} />
                    <CardContent>
                      <Typography gutterBottom variant='h6' color='primary'>
                        {resto.name}
                      </Typography>
                      <Typography gutterBottom variant='p' color='textPrimary' style={{display:'block'}}>
                        {resto.address}
                      </Typography>
                      <Typography gutterBottom variant='subtite2' color='textSecondary'>
                        {resto.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container justify='center'>
                        <Button size='small' color='primary' variant='contained' to={`/restaurants/${resto._id}`} component={Link}>
                        Restaurant Items
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              )) : (
                <Typography gutterBottom variant='subtite1' color='primary'>
                    Restaurants Not Found
                </Typography>
              )
            }
          </Grid>
          {dataRestaurants.pagination && console.log(dataRestaurants.pagination)}
          {
            dataRestaurants.pagination && dataRestaurants.pagination.totalPages > 1 && (
              <Grid container justify='center' style={{ marginTop: '50px' }}>
                <Pagination page={page} onChange={handleChange} count={dataRestaurants.pagination.totalPages} color='secondary' />
              </Grid>
            )
          }
        </Container>
      </div>
    </>
  )
}

export default ShowRestaurants
