import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import {
  Card, CardContent, CardActions, TextField,
  Typography, Button, Grid, Avatar, Container
} from '@material-ui/core'
import { Search, Store, Category } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import getData from '../../helpers/getData'
import qs from 'query-string'
const useStyles = makeStyles({
  listCategories: {
    borderBottom: '1px solid #ccc',
    minHeight: '100px',
    marginBottom: '50px'
  },
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
    minHeight: '200px'
  },
  avatar: {
    height: '100px',
    width: '100px'
  }
})

function ShowItems (props) {
  const history = useHistory()
  const [search, setSearch] = React.useState(qs.parse(props.location.search).s)
  const classes = useStyles()
  const [activeCategory, setActiveCategory] = React.useState(0)
  const [dataItems, setData] = React.useState({})
  const [dataCategory, setDataCategory] = React.useState([])
  const [searchKey, setSearchKey] = React.useState('')
  const [page, setPage] = React.useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }
  const handleSearchInput = (e) => {
    setSearchKey(e.target.value)
  }
  const handleSubmitSearch = () => {
    if (searchKey.trim()) {
      setSearch(searchKey)
      history.push('/items?s='+searchKey)
    }
  }
  const getCategory = async () => {
    try {
      const response = await getData('/browse-categories')
      console.log(response)
      setDataCategory(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const getItems = async (page, category) => {
    try {
      const condition = `limit=5&sort[created_at]=1&page=${page}`
      let url = `/browse-items?${condition}`
      if (category) {
        console.log(category)
        url = `/browse-categories/${category}?${condition}`
      }
      if (search && search.trim()) {
        console.log(search)
        url += `&search[name]=${search}`
      }
      const response = await getData(url)
      console.log(response.data)
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getCategory()
    getItems(page, activeCategory)
  }, [activeCategory, page, search])
  return (
    <>
      <div className={classes.listCategories}>
        <Container>
          <Grid container className={classes.grid}>
            <Button size='small' variant={parseInt(activeCategory) === 0 ? 'contained' : 'outlined'} onClick={() => { setActiveCategory(0); setPage(1); setSearch('');setSearchKey('');history.push('/items')}} color='secondary' className={classes.buttonCategories}> Show All </Button>
            {
              dataCategory.length > 0 && dataCategory.map((cat) => (
                <Button key={cat._id} size='small' style={{ textTransform: 'capitalize', fontSize: '15px', minWidth: '120px' }} variant={parseInt(activeCategory) === parseInt(cat._id) ? 'contained' : 'outlined'} onClick={() => { setActiveCategory(`${cat._id}`); setPage(1) }} color='secondary' className={classes.buttonCategories}> {cat.name} </Button>
              ))
            }
          </Grid>
        </Container>
      </div>
      <div className={classes.listItems}>
        <Container>
          <Grid container alignItems='center' justify='center' spacing={2} style={{marginBottom:'10px'}}>
            <TextField value={searchKey} onChange={handleSearchInput} label='Search Item...' variant='outlined' margin='dense' style={{ marginBottom: '10px', marginRight:'5px'}} />
            <Button color='secondary' onClick={handleSubmitSearch} variant='contained'><Search/></Button>
          </Grid>
          {search &&
            <Typography align='center' style={{marginBottom: '20px'}} variant='h6'>
              Search For : {search}
            </Typography>}
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
          {/* <Dialog
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
          </Dialog> */}
        </Container>
      </div>
    </>
  )
}

export default ShowItems
