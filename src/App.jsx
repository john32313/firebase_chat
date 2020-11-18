import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { isAuthSelector } from './store/selectors';
import SignUpPage from './views/SignUpPage';
import HomePage from './views/HomePage';

function App() {
  const isAuth = useSelector(isAuthSelector);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isAuth ? <Redirect to="/conversations" /> : <SignUpPage />}
        </Route>

        <Route path="/conversations">
          {!isAuth ? <Redirect to="/" /> : <HomePage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
