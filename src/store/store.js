import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import reducers from './reducers/reducers';
import { signInAction } from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(signInAction(user));
  }
});

export default store;
