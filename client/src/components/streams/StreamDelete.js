import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStream, deleteStream } from "../../actions";

import history from "../../history";
import Modal from "../Modal";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with tite: ${this.props.stream.title} ?`;
  }

  render() {
    return (
      <div>
        StreamDelete
        <Modal
          title="Stream Delete"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
