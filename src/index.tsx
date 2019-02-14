import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history'
import { store } from '@app/store/AppStore'
 
import App from '@app/components/App';
import '@app/index.less';

const history: History = createBrowserHistory();

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={ store }>
    <App history={ history } />
    
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
