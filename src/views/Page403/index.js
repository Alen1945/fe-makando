import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

export default function Page403 (props) {
  return (
    <Grid container justify='center' component={Container} style={{ marginTop: '200px' }}>
      {console.log(props)}
      <Typography variant='h3'>
        {
          props.isLogin ? <><strong>403</strong> You Login But Don't Have Access to This</> : <h1>heh</h1>
        }
      </Typography>
    </Grid>
  )
}
