import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import ReactIf from '../components/shared/ReactIf';
import useAuthService from '../hooks/useAuthService';

export function ReadOnlyAccessGuardedRoute(props) {
    const { component, isAuthorized, ...rest} = props;
    const { isUserLoggedIn } = useAuthService();
    return (
        <Route {...rest} render={(routeProps) =>
        <div>
            <ReactIf condition={!isUserLoggedIn()}>
                <Redirect to={{pathname: '/login', state: {from: routeProps?.location}}} />
            </ReactIf>
            <ReactIf condition={isUserLoggedIn() && isAuthorized}>
                <Component {...routeProps} />
            </ReactIf>
            <ReactIf condition={isUserLoggedIn() && !isAuthorized}>
                <Redirect to={{pathname: '/unauthorized', state: {from: routeProps?.location}}} />
            </ReactIf>
        </div>
        }
                         />
    );
}