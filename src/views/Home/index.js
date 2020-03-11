import React from 'react'
import Container from '@material-ui/core/Container'
import Header from './components/Header'
import CardItem from './components/CardItem'
import { Grid } from '@material-ui/core'
export default function Home (props) {
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3} justify='center'>
          {
            [1, 2, 3, 4, 5, 6].map((v, i) => (
              <Grid item key={i}>
                <CardItem />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  )
}
