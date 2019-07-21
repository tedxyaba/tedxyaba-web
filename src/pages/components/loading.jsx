import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="text-center my-5">
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only">Loading {this.props.page}...</span>
        </div>
      </div>
    )
  }
}

export default Loading
