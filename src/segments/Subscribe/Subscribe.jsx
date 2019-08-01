import React, { Component } from 'react';
import './Subscribe.scss';
// import apiClient from '../../services/api-client';
// import apiRoutes from '../../utils/routes';
import Section from '../../pages/components/ui/Section';
import Button from '../../pages/components/ui/Button';

class Subscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      loading: false,
      errors: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _submit(e) {
    e.preventDefault();
    console.log('Submit clicked!', this.state)
  }

  render() {
    const title = 'Be the first to know';

    return (
      <Section title={this.props.title || title} classNames="container-fluid subscribe">
        <div className="row justify-content-center">
          <form className="subscribe-form">
            <div className="form-row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <input id="name" type="text" name="name" className="form-control" onChange={this.handleChange} placeholder="Name" />
                </div>
              </div>

              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <input id="email" type="email" name="email" className="form-control" onChange={this.handleChange} placeholder="Email" />
                </div>
              </div>

              <div className="col-sm-4">
                <Button
                  type="button"
                  text="Send"
                  btnType="primary"
                  classNames="btn-block"
                  onClick={this._submit}
                />
              </div>
            </div>
          </form>
        </div>
      </Section>
    )
  }
}

export default Subscribe
