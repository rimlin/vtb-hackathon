import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

export const PublicRoute = ({ component: Component, ...rest }: RouteProps) => {
	return <Route {...rest} render={props => Component && <Component {...props} />} />
}
