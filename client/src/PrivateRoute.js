import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './components/API_endpoints'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return  (
       <Route {...rest} render={(props)=> isAuthenticated()? (
          <Component {...props} />
       ):(
          <Redirect to={{pathname: '/login', state:{ from: props.location }}} />
       ) } />
    )
}

export default PrivateRoute
