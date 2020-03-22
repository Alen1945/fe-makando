import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import {
  Card, CardContent, CardActions,
  Typography, Button, Grid, Avatar, Container
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import {Store} from '@material-ui/icons'
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

export default function DetailRestaurants (props) {
  const classes = useStyles()
  const [dataItems, setData] = React.useState({})
  const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }

  const getItems = async (page, category) => {
    try {
      const condition = `limit=5&sort[created_at]=1&page=${page}`
      let url = `/browse-restaurants/${props.match.params.id}/items?${condition}`
      const response = await getData(url)
      console.log(response.data)
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getItems(page)
  },[page])
  return (
    <>
      <div className={classes.listItems}>
        <Container>
          <Grid container justify='center' spacing={2} alignItems='stretch'>
            {
              dataItems.dataItems ? dataItems.dataItems.map((item) => (
                <Grid item key={item._id} md={2} sm={4} xs={6} style={{marginBottom:'15px'}}>
                  <Card align='center' style={{ padding: '10px', height:'100%' }}>
                    <Avatar alt={item.name} src={process.env.REACT_APP_API_URL + '/' + item.images} className={classes.avatar} />
                    <CardContent>
                      <Typography gutterBottom variant='subtite1' color='primary'>
                        {item.name}
                      </Typography>
                      <Typography gutterBottom variant='h6'>
                        Rp. {parseFloat(item.price).toFixed(2)}
                      </Typography>
                      <Typography gutterBottom variant='subtite2' style={{display:'block', textDecoration:'none'}} color='primary' to={'/restaurants/'+item.id_restaurant} component={Link}>
                        <Store style={{ display: 'inline-flex',verticalAlign: 'bottom'}}/> {item.name_restaurant}
                      </Typography>
                      <Typography gutterBottom variant='p' color='textSecondary'>
                        {item.name_category}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button size='small' color='secondary' variant='contained'>
                        <AddShoppingCart />
                      </Button> */}
                      <Grid container justify='center'>
                        <Button size='small' color='secondary' variant='contained' to={`/items/${item._id}`} component={Link}>
                        Details
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              )) : (
                <Typography gutterBottom variant='subtite1' color='primary'>
                    Item Not Found
                </Typography>
              )
            }
          </Grid>
          {
            dataItems.pagination && dataItems.pagination.totalPages > 1 && (
              <Grid container justify='center' style={{ marginTop: '50px' }}>
                <Pagination page={page} onChange={handleChange} count={dataItems.pagination.totalPages} color='secondary' />
              </Grid>
            )
          }
        </Container>
      </div>
    </>
  )
}
