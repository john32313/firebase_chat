import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import reducers from './reducers/reducers';
import { signInAction } from './actions/actions';
import { getContactsAction } from './actions/contactsActions';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
  ),
);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(signInAction(user));
    store.dispatch(getContactsAction(user));
  }
});

export default store;
