import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Editor from './Editor';
import { data } from './mockData';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <div style={{ width: '1000px', height: '600px' }}>
      <Editor
        data={data}
        onNodeDoubleClick={(id) => console.log(id)}
        onSave={(data) => console.log(data)}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
