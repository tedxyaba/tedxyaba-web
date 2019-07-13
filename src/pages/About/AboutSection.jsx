import React, { Component } from 'react';

class AboutSection extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <p>{this.props.description}</p>
      </div>
    )
  }
}

export default AboutSection
