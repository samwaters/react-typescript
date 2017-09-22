import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

interface IAuthenticatedRoute {
	component?:any;
	exact?:boolean;
	location?:any;
	loggedIn?:boolean;
	path?:string;
	redirect?:string;
}

class AuthenticatedRoute extends React.Component<IAuthenticatedRoute, {}> {
	render() {
		let allProps = this.props;
		return <Route {...allProps} render={
            props => {
            	return allProps.loggedIn
					? React.createElement(this.props.component, props, null)
					: <Redirect to={{
						pathname: allProps.redirect,
						state: {
							from: props.location
						}
                	}}/>
        	}
        } />
	}
}

export default connect(
    (state:any) => {
        return {
            loggedIn: state.auth.loggedIn
        }
    },
    null
)(AuthenticatedRoute) as React.ComponentClass<IAuthenticatedRoute>;
