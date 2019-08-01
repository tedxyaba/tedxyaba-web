import React, { Component } from 'react';
import './Join.scss';
import Button from '../../components/ui/Button';
import apiRoutes from '../../utils/routes';
import TransformHomepageData from '../../utils/data-transformers/homepage';
import apiClient from '../../services/api-client';

class Join extends Component {
  constructor(props) {
    super(props)

    this.state = {
      link: {},
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    if (!!this.props.link) {
      this.setState({
        link: this.props.link
      })
    } else {
      this._fetchData()
    }
  }

  _fetchData() {
    const lpRoute = apiRoutes.landingPage();
    const cb = (success, data) => {
      if (success) {
        const t = TransformHomepageData(data);

        this.setState({
          link: t.link_to_volunteer_form
        })
      } else {
        this.setState({
          errors: data
        })
      }
    }

    apiClient.get(lpRoute, cb)
  }

  render() {
    const { link } = this.state;

    return (
      <section className="join container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 text-center">
            <Button
              type="link"
              text="Join our volunteer team"
              btnType="register"
              classNames=""
              href={link.url}
              target={link.target}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default Join
