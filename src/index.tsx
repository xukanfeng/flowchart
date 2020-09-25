import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Editor from './Editor';
import { fakeData } from './components/fakeData';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Editor customizedNodes={[{id: "10", shape: (<div style={{height: '50px', width: '200px', background: 'yellow'}}>aaa</div>)}]} onNodeDoubleClick={id => console.log(id)} onSave={data => console.log(data)}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
