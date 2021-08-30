import {Route, Switch} from 'react-router-dom';
import home from '../components/home/Home';
import NotFound from '../components/core/404/NotFound';
import React from 'react';
import Login from '../components/core/login/Login';
import Logout from '../components/core/logout/Logout';
import UnAuthorized from '../components/core/unauthorized/UnAuthorized';
import { AdminGuardedRoute } from './AdminGuardedRoute';
import ManagedAdGroup from '../components/admin/groups/ManageAdGroup';
import { ReadOnlyAccessGuardedRoute } from './ReadOnlyAccessGuardedRoute';
import { DataUserGuardedRoute } from './DataUserGuardedRoute';
import ReportsSearch from '../components/reports/ReportsSearch';
import useAuthService from '../hooks/useAuthService';

export default function Routes(){
    const { isReadOnly, isDataUser, isProManager, isSysAdmin } = useAuthService();
    return (
        <div>
            <Switch>
                <ReadOnlyAccessGuardedRoute component={Home} path={"/"} isAuthorized={isReadOnlyUser()} exact={true} />
                <ReadOnlyAccessGuardedRoute component={Home} path={"/home"} isAuthorized={isReadOnlyUser()} exact={true} />

                <DataUserGuardedRoute component={ReportsSearch} path={"/report"} isAuthorized={isDataUser()} exact={true} />

                {/* Admin Routes */}
                <AdminGuardedRoute component={ManagedAdGroup} path={"/admin/group/manage"} isAuthorized={isSysAdmin()} excat={true} />

                {/* Core Routes */}
                <Route component={Login} path={"/login"} exact={true} />
                <Route component={Logout} path={"/logout"} exact={true} />
                <Route component={UnAuthorized} path={"/unauthorized"} exact={true} />
                <Route component={NotFound} path={"*"} />
            </Switch>
        </div>
    )
}