import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Subscribe.scss';
// import apiClient from '../../services/api-client';
// import apiRoutes from '../../utils/routes';
import Section from '../../pages/components/ui/Section';

class Subscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      loading: false,
      errors: null,
    }

    this._submit = this._submit.bind(this);
  }

  _submit() {
    console.log('Submit clicked!')
  }

  render() {
    const title = 'Join our volunteer team';

    return (
      <Section title={this.props.title || title} classNames="subscribe">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 p-5">
            <form class="form-inline">
              <div class="form-group mb-2">
                <label for="staticEmail2" class="sr-only">Email</label>
                <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com" />
              </div>
              <div class="form-group mx-sm-3 mb-2">
                <label for="inputPassword2" class="sr-only">Password</label>
                <input type="password" class="form-control" id="inputPassword2" placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-primary mb-2">Confirm identity</button>
            </form>
          </div>
        </div>
      </Section>
    )
  }
}

export default Subscribe
