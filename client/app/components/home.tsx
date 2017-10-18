import * as React from 'react';
// Redux
import {connect} from 'react-redux';
import {IConnectedProps} from 'actions/action.interface';
import RaisedButton from 'material-ui/RaisedButton';
import {IAppState} from 'reducers/index';
import * as homeActions from 'actions/home.actions';
// Components
import {Row, Col} from 'components/common/grid';
import {Information} from 'components/common/messages';

interface HomeProps extends IConnectedProps {
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
					<RaisedButton label='Refresh Time' primary onClick={() => this.props.getTime()}/>
					<RaisedButton label='Refresh Time (2)' secondary onClick={() => this.props.getTime()}/>
				</Col>
			</Row>
		</div>
	}
}

const HomeComponent = connect(
		(state: IAppState) => ({
			time: state.home.time
		}),
		(dispatch: Function) => {
			return {
				getTime: () => dispatch(homeActions.requestTime())
			}
		}
)(Home);

export default HomeComponent;
