import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthenticatedRoute from 'components/common/authenticated.route';
import HomeComponent from 'components/home';
import NotFoundComponent from 'components/notfound';
import '../theme/global';

class AppComponent extends React.Component<null, null> {
    render() {
        return <MuiThemeProvider>
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <AppBar title="React Starter"/>
                <div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
                    <Switch>
                        <Route component={HomeComponent} exact path="/"/>

                        <AuthenticatedRoute component={HomeComponent} path="/secret" redirect="/login"/>
                        <Route component={NotFoundComponent}/>
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    }
}

export default AppComponent;
