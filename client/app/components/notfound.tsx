import * as React from 'react';

class NotFoundComponent extends React.Component<undefined, undefined> {
	render() {
		return <div>
			<h3>Not Found</h3>
			<p>The page you were looking for is not found</p>
		</div>
	}
}

export default NotFoundComponent;
