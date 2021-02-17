import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import Posts from 'containers/Posts/Posts';
import HomePage from 'containers/HomePage/HomePage';
import Todos from 'containers/Todos/Todos';
import PostDetails from 'containers/PostDetails/PostDetails';

const AppRoutes = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/posts/:postId" component={PostDetails} />
                <Route exact path="/todos" render={(routeParams) => <Todos {...routeParams} />} />
                <Route exact path="/" component={HomePage} />
                <Route exact path="*" >
                    <div>404</div>
                </Route>
            </Switch>
        </Layout>
    )
}

export default AppRoutes;
