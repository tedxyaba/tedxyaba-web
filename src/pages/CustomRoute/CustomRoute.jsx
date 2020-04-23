import React, { Component } from 'react';

class CustomRoute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="custom text-center">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfkk9vkPpS9nzmBJIf3fFeO4s6MSjGOzqxo7oL4tc87jCryHA/viewform?embedded=true" width="640" height="1530" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      </div>
    )
  }
}

export default CustomRoute
