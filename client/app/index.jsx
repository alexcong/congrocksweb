/*React UI*/


import React from 'react';
import {render} from 'react-dom';
import request from 'superagent';

class LikesCounterComponent extends React.Component {
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

    componentDidMount() {
        request
            .get('/likescounter')
            .end((err, res)=> {
                if (err) {
                    console.log('cannot get data')
                }
                this.setState({likesCounter: res.body});
            });
    }

    componentDidUpdate(prevProps, prevState) {
        request
            .post('/likescounter')
            .send({likesCounter: this.state.likesCounter})
            .end((err, res)=> {
                if (err) {
                    console.log('cannot get data')
                }
            });
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
                <h1> Hello React!</h1>
                <LikesCounterComponent />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));