import React, { Component } from 'react';
import TEDXRegIcon from '../../assets/images/register.png';

class CustomRoute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="custom text-center">
        <img src={TEDXRegIcon} alt="logo" />
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSepkebSBA-g-pMO7DRoNxFIJHAmm1IsFdMc6JFdQhPvXuN7lw/viewform?embedded=true" width="640" height="1568" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      </div>
    )
  }
}

export default CustomRoute
