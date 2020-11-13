import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { isAuthSelector } from './store/selectors';
import SignUpPage from './views/SignUpPage';
import MessagesPage from './views/MessagesPage';

function App() {
  const isAuth = useSelector(isAuthSelector);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isAuth ? <Redirect to="/messages" /> : <SignUpPage />}
        </Route>

        <Route path="/messages">
          {!isAuth ? <Redirect to="/" /> : <MessagesPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
