import * as React from 'react'
import * as styles from './messages.styles.css';

const Error = (props:any) => {
    return (
        <div className={styles.errorMessage}>
            <div className={styles.errorIcon} />
            {props.children}
        </div>
    )
};

const Information = (props:any) => {
    return (
        <div className={styles.infoMessage}>
            <div className={styles.infoIcon} />
            {props.children}
        </div>
    )
};

const Success = (props:any) => {
    return (
        <div className={styles.successMessage}>
            <div className={styles.successIcon} />
            {props.children}
        </div>
    )
};

const Warning = (props:any) => {
    return (
        <div className={styles.warningMessage}>
            <div className={styles.warningIcon} />
            {props.children}
        </div>
    )
};

export {Error, Information, Success, Warning};