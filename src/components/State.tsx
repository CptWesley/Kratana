import * as React from 'react';

interface IState {
    value: string;
}

export default class StatefulComponent extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: '',
        };
    }

    render() {
        return <div>
            <input
                type='text'
                placeholder='Your name'
                value={this.state.value}
                onChange={e => this.setState({ value: e.currentTarget.value })}
            />
            <p>Hi {this.state.value}!</p>
        </div>
    }
}
