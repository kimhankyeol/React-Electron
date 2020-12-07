import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//ant design css
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
//react quill 
import './quill.snow.css';
//electron tabs
// import "../node_modules/electron-tabs/electron-tabs.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
//import ReduxThunk from 'redux-thunk';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

// const customHistory = createBrowserHistory();
const customHistory = createHashHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
}); // 사가 미들웨어를 만듬

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야함
  composeWithDevTools(
    applyMiddleware(
      //ReduxThunk.withExtraArgument({ history: customHistory }), /
      sagaMiddleware, // 사가 미들웨어를 적용함 / khk 여기서는 redux saga 로 browser history 관리하는거같음
      logger
    )
  )
); // 여러개의 미들웨어를 적용 할 수 있습니다.

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
