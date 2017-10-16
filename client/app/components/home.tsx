import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {Row, Col} from 'components/common/grid';
import {Information} from 'components/common/messages';
import * as homeActions from 'actions/home.actions';
import {IAppState} from "reducers/index";

interface HomeProps {
    dispatch?: (action: any) => void;
    time: number,
    getTime: () => void;
}

class Home extends React.Component<HomeProps, {}> {
    render() {
        return <div>
            <h3>Home Component</h3>
            <Information>This is an information message</Information>
            <Row>
                <Col sm={12} md={6}>
                    <p>This is the home page</p>
                    <p>It is using a responsive 12-column grid layout</p>
                </Col>
                <Col sm={12} md={6}>
                    <p>Current timestamp: {this.props.time}</p>
                    <RaisedButton label="Refresh Time" primary onClick={() => this.props.getTime()} />
                    <RaisedButton label="Refresh Time (2)" secondary onClick={() => this.props.getTime()} />
                </Col>
            </Row>
        </div>
    }
}

const HomeComponent = connect(
    (state: IAppState) => {
        return {
            time: state.home.time
        }
    },
    (dispatch: any) => {
        return {
            getTime: () => dispatch(homeActions.requestTime())
        }
    }
)(Home);

export default HomeComponent;
