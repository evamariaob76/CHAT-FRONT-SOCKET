import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
    const {auth, verificarToken} = useContext(AuthContext);
    useEffect(() => {
      verificarToken();
    

    }, [verificarToken])
    

    if(auth.checking){        

        return <h1>Espere...</h1>
    }
    return (
        <Router>
            <div>
                
                <Switch>
                    {/*<Route path="/auth" component={ AuthRouter } />*/}
                    <PublicRoute isAuthenticated={auth.logged} path="/auth" component={AuthRouter}/>
                   {/* <Route exact path="/" component={ ChatPage } />*/}
                   <PrivateRoute isAuthenticated={auth.logged} path="/" component={ChatPage}/>

                    <Redirect to="/" />
                </Switch>
            </div>
            </Router>
    )
}
