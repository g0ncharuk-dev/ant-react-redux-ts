import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';

import reducer from '@app/reducers/index';

const history = createBrowserHistory();

const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancer(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);
