import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
// Redux
import {setTheme} from 'actions/theme.actions';
import {IAppState} from 'reducers/index';
import {ITheme} from 'reducers/theme.reducer';
// Material UI
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import {TouchTapEvent} from 'material-ui';
// Components
import AuthenticatedRoute from 'components/common/authenticated.route';
import HomeComponent from 'components/home';
import NotFoundComponent from 'components/notfound';
// Themes
import '../theme/global';

interface AppProps {
    currentTheme: string;
    dispatch?: (action: any) => void;
    themes: { [key: string]: ITheme },
    setTheme: (theme: string) => void;
}

interface AppState {
    currentTheme: string;
}

class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {
            currentTheme: 'theme1'
        }
    }

    handleThemeChange(theme: string) {
        this.setState({currentTheme: theme});
        this.props.setTheme(theme);
    }

    render() {
        return <MuiThemeProvider muiTheme={getMuiTheme({palette: this.props.themes[this.props.currentTheme]})}>
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <AppBar
                    title="React Starter"
                    iconElementRight={<SelectField
                        autoWidth
                        floatingLabelText='Theme'
                        onChange={(e: TouchTapEvent, i: number, v: any) => this.handleThemeChange(v)}
                        value={this.state.currentTheme}
                    >
                        <MenuItem value='theme1' primaryText="Theme 1"/>
                        <MenuItem value='theme2' primaryText="Theme 2"/>
                        <MenuItem value='theme3' primaryText="Theme 3"/>
                    </SelectField>}
                />
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

const AppComponent = connect(
    (state: IAppState) => {
        return {
            currentTheme: state.theme.currentTheme,
            themes: state.theme.themes
        }
    },
    (dispatch: any) => {
        return {
            setTheme: (theme: string) => dispatch(setTheme(theme))
        }
    }
)(App);

export default AppComponent;
