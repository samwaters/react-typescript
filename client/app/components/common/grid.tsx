import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './grid.styles.css';

class Row extends React.Component {
	render() {
		return <div className={styles.row}>
			{this.props.children}
		</div>
	}
}

interface IColProps {
	xs?:number,
	xsOffset?:number,
    sm?:number,
    smOffset?:number,
    md?:number,
    mdOffset?:number,
    lg?:number,
    lgOffset?:number,
    xl?:number,
    xlOffset?:number,
}

class Col extends React.Component<IColProps, undefined> {
	render() {
		let classes:any = {};
		classes[styles.col] = true;
		if(this.props.xs) {
			classes[styles['xs' + this.props.xs]] = true;
		}
		if(this.props.xsOffset) {
			classes[styles['xsOffset' + this.props.xsOffset]] = true;
		}
		if(this.props.sm) {
			classes[styles['sm' + this.props.sm]] = true;
		}
		if(this.props.smOffset) {
			classes[styles['smOffset' + this.props.smOffset]] = true;
		}
		if(this.props.md) {
			classes[styles['md' + this.props.md]] = true;
		}
		if(this.props.mdOffset) {
			classes[styles['mdOffset' + this.props.mdOffset]] = true;
		}
		if(this.props.lg) {
			classes[styles['lg' + this.props.lg]] = true;
		}
		if(this.props.lgOffset) {
			classes[styles['lgOffset' + this.props.lgOffset]] = true;
		}
		if(this.props.xl) {
			classes[styles['xl-' + this.props.xl]] = true;
		}
		if(this.props.xlOffset) {
			classes[styles['xlOffset' + this.props.xlOffset]] = true;
		}
		return <div className={classNames(classes)}>
			{this.props.children}
		</div>
	}
}

export {Row, Col};
