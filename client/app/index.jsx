/*React UI*/


import React from 'react';
import {render} from 'react-dom';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {likesCounter : 0};
        this.onLike = this.onLike.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onLike () {
        this.setState({likesCounter : this.state.likesCounter + 1});
    }

    onReset () {
        this.setState({likesCounter : 0});
    }

    render() {
        return (
            <div>
                Likes: <span>{this.state.likesCounter}</span>
                <div><button onClick={this.onLike}>Like</button></div>
                <div><button onClick={this.onReset}>Reset</button></div>
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <div>
                <p> Hello React!</p>
                <TestComponent />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));