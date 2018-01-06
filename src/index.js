import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import './bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './styles/style.css';
import registerServiceWorker from './registerServiceWorker';
import Search from './components/form/search';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

/* ---------- with Debug ---------------*/

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <div>
      <BrowserRouter>
          <Container fluid className="booksPage">
            <Switch>
              <Route exact path="/" component={Search} />
          </Switch>
      </Container>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('#root'));

  /* ---------- without Debug ---------------
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>

    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
*/

registerServiceWorker();
