import React, { Component } from 'react';
import { connect } from 'react-redux';

import ImageInput from 'components/ImageInput/ImageInput';

// import fbService from 'api/fbService'
export class HomePage extends Component {

    render() {
        console.log('props: ', this.props);
        return (
            <div>
                <ImageInput />
                <button onClick={this.props.incrementCount}>INCREMENT</button>
                <span style={{ margin: '0 12px' }}>{this.props.count}</span>
                <button onClick={this.props.decrementCount}>DECREMENT</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = {
    incrementCount: () => ({ type: 'INCREMENT_COUNT' }),
    decrementCount: () => ({ type: 'DECREMENT_COUNT' })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);