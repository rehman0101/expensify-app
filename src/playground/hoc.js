import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Info: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This information is private !</p>}
            <WrappedComponent {...props}/>
        </div>
    );
}

const withAuthentication = (WrappedComponent) => {
    return (props) => {
       return props.isAuth ? <WrappedComponent {...props} /> : <p>Please log in to view information.</p>
    }
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = withAuthentication(Info);
const info = 'These are some details.';

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are some details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuth={true} info={info}/>, document.getElementById('app'));

