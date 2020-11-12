import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import { isAuthSelector } from './store/selectors';
import HomePage from './views/HomePage';

function App() {
  const isAuth = useSelector(isAuthSelector);

  return (
    <main className="App">
      <Auth />
      {isAuth && <HomePage />}
    </main>
  );
}

export default App;
