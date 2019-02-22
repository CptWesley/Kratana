import * as React from 'react';
import render, { setCanvas } from '@/engine/renderer';
import StatefulComponent from './components/State';

const css = require('./App.scss');

export default class App extends React.Component {
    render() {
        return <>
            <h1>Hello world</h1>
            <p>This is rendered by React.</p>
            <canvas
                ref={setCanvas}
                className={css.canvas}
                width={300}
                height={300}
            />
            <br />
            <button onClick={render}>Render screen</button>
            <StatefulComponent />
        </>
    }
}
