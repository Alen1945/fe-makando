import React from 'react'
import { Container, Divider, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import CardItem from './components/CardItem'
import getData from '../../helpers/getData'

export default function Home (props) {
  const  [items, setItem] = React.useState([])
  React.useEffect(() => {
    getDataItems(15)
  })
  const getDataItems = async (numData) => {
    try {
      const dataItems = await getData('/browse-items?sort[_id]=1&limit='+numData)
      if (dataItems.data.success && dataItems.data.data) {
        setItem(dataItems.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Grid container spacing={2} justify='center'>
          {
            items.map((v, i) => (
              <Grid item key={v._id} md={3} sm={4}>
                <CardItem detailItem={v} />
              </Grid>
            ))
          }
          <Grid xs={12} />
          <Divider style={{ margin:'30px 0' }}/>
          <Button variant='contained' color='secondary' style={{ marginBottom: '40px' }} to='/items' component={Link}>Show All Avaible Item</Button>
        </Grid>
      </Container>
    </>
  )
}
