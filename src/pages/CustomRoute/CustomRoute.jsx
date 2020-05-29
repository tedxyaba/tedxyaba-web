import React from 'react';
import './CustomRoute.scss';
import Button from '../../components/ui/Button';
import Footer from '../../segments/Footer';

const LiveStreamLink = () => {
  return (
    <Button
      type="link"
      text="VIEW LIVE STREAM"
      btnType="link"
      classNames='vsenue'
      href='/live'
    />
  )
}

const CustomRoute = () => {
  return (
    <div className="">
      <div className='container'>
        <h1 class='mt-4 pb-3'>Registration closed.</h1>
        <h4 class='pb-3'>You can follow the event by going to our livestream page</h4>
        <LiveStreamLink />
      </div>

      <div className='cust-footer'>
        <Footer />
      </div>
    </div>
  )
}

export default CustomRoute
