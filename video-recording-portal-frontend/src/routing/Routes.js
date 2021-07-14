import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import { routes } from "../route-definitions"

const appRoutes = (() => (
    routes.map(route => (
        route.map(routeDef => {
            const Component = routeDef.type === 'PRIVATE' ? PrivateRoute : Route
            return  <Component {...routeDef.props}/>
        })
    ))
))()

const Routes = () => <Switch>{ appRoutes }</Switch>

export default Routes
