import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import SignIn from './components/SignIn';
import { signOutAction } from './store/actions/actions';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  return (
    <main className="App">
      {isAuth ? (
        <button
          type="button"
          onClick={() => {
            dispatch(signOutAction());
          }}
        >
          Sign out
        </button>
      ) : (
        <SignIn />
      )}
    </main>
  );
}

export default App;
