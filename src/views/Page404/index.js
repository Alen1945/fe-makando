import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

export default function Page404 (props) {
  return (
    <Grid container justify='center' component={Container} style={{ marginTop: '200px' }}>
      <Typography variant='h3'>
        <strong>404</strong> Page Not Found
      </Typography>
    </Grid>
  )
}
