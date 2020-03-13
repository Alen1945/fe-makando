import React from 'react'
import Container from '@material-ui/core/Container'
import Header from './components/Header'
import CardItem from './components/CardItem'
import { Grid } from '@material-ui/core'
export default function Home (props) {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Grid container spacing={2} justify='center'>
          {
            [1, 2, 3, 4, 5, 6,7,8,9,10].map((v, i) => (
              <Grid item key={i} md={3} sm={4}>
                <CardItem />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  )
}
