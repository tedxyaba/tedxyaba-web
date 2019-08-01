import React, { Component } from 'react';
import './Join.scss';
import Section from '../../pages/components/ui/Section';
import Button from '../../pages/components/ui/Button';

const Join = props => {
  return (
    <section className="join container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 text-center">
          <Button
            type="link"
            text="Join our volunteer team"
            btnType="register"
            classNames=""
            href={"https://www.google.com"}
            target="_blank"
          />
        </div>
      </div>
    </section>
  )
}

export default Join
