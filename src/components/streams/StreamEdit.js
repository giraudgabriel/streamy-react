import _ from 'lodash';
import React, {Component} from 'react';
import {fetchStream, editStream} from '../../actions';
import {connect} from 'react-redux';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
    componentDidMount() {
        this
            .props
            .fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        const {id} = this.props.stream;
        this
            .props
            .editStream(id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>
                Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
