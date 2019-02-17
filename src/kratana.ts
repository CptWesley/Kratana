import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const app = React.createElement(App);
const mountPoint = document.getElementById('app')!;

ReactDOM.render(app, mountPoint);
