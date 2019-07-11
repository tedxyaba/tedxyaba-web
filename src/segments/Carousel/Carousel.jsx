import React, { Component } from 'react';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    const { images } = this.props;

    return (
      <div className="bd-example">
        <div id="tedxyabaHomeCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            { images && images.map((i, idx) => (
              <li key={i.id} data-target="#tedxyabaHomeCarousel" data-slide-to={idx} className={i.id === 1 ? 'active' : ''}></li>
            ))}
          </ol>
          <div className="carousel-inner">
            { images && images.map(image => (
              <div key={image.id} className={`carousel-item ${image.id === 1 ? 'active' : ''}`}>
                <img src={image.url} className="d-block w-100" alt={image.alt} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{ image.slideLabel }</h5>
                  <p>{ image.slideText }</p>
                </div>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#tedxyabaHomeCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#tedxyabaHomeCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    )
  }
}

export default Carousel
