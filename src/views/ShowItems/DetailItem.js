import React from 'react'
import getData from '../../helpers/getData'
import {
  Container, Grid, Card, CardContent,
  CardActions, Typography, Button, Avatar,
  TextField, Paper, Tab, Tabs, CircularProgress
} from '@material-ui/core'

import { AddShoppingCart } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../components/CustomTextField'
import TabPanel from '../../components/TabPanel'
import RelatedItem from './components/RelatedItem'
import LayoutItemReview from './components/ReviewItems'
const useStyles = makeStyles({
  avatar: {
    height: '250px',
    width: '250px'
  }
})

export default function DetailsItem (props) {
  const classes = useStyles()
  const [dataItem, setDataItem] = React.useState([])
  const [value, setValue] = React.useState(0)
  const [reviewItem, setReviewItem] = React.useState([])

  React.useEffect(() => {
    getDetailItem(props.match.params.id)
  }, [props.match.params.id])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const getDetailItem = async (id) => {
    try {
      const dataItem = await getData('/browse-items/' + id)
      console.log(dataItem.data.data)
      if (dataItem.data.success && dataItem.data.data) {
        setDataItem(dataItem.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleClickReview = async () => {
    try {
      const dataReview = await getData('/reviews/items/' + props.match.params.id)
      console.log(dataReview.data.data)
      if (dataReview.data.success) {
        setReviewItem(dataReview.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Container>
      <Grid container justify='center' alignItems='center' style={{ marginTop: '40px' }}>
        <Grid item sm={5} md={3}>
          <Avatar alt={dataItem.name} src={(process.env.REACT_APP_API_URL + '/' + dataItem.images)} className={classes.avatar} />
        </Grid>
        <Grid item sm={5} md={3}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h6' color='textSecondary'>
                {dataItem.name}
              </Typography>
              <Typography gutterBottom variant='h5'>
                Rp. {parseFloat(dataItem.price).toFixed(2)}
              </Typography>
              <Typography gutterBottom variant='subtitle1' color='textSecondary' lineHeight={10}>
                Stock {dataItem.quantity} pcs
              </Typography>
              <Typography gutterBottom variant='p' color='textprimary'>
                {dataItem.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Formik
                initialValues={{total_items:1}}
                validationSchema={{total_items:Yup.number().required()}}
                validate={(value)=>{
                  console.log(value)
                }}
              >
                <Form>
                  <Grid container spacing={3} justify='flex-end' alignItems='center'>
                    <Grid item xs={5}>
                      <CustomTextField type='number' name='total_items' label='Total Items' variant='outlined' size='small' component={TextField} />
                    </Grid>
                    <Grid item xs={4}>
                      <Button size='small' color='secondary' variant='contained' width='100%'>
                        <AddShoppingCart />
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Paper style={{ marginTop: '40px' }} >
        <Tabs
          indicatorColor='secondary'
          value={value}
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='Related Items' />
          <Tab label='Reviews' onClick={handleClickReview}/>
        </Tabs>
      </Paper>
      <Grid>
        <TabPanel value={value} index={0}>
          <Grid container spacing={1}>
            { dataItem.relatedItem &&
              dataItem.relatedItem.map((related) => (
                <Grid item sm={3} md={2} key={related._id} justify='center'>
                  <RelatedItem {...related} />
                </Grid>
              ))
            }
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid align='center' justify='center' sytle={{ marginTop: '10px' }}>
            {reviewItem ? <LayoutItemReview dataReview={reviewItem} />: <Typography variant='h6' color='textSecondary'>Has Not Review For This Item</Typography>}
          </Grid>
        </TabPanel>
      </Grid>
    </Container>
  )
}
