import React from 'react';
import './About.scss';

const InovationImg = 'http://tedxyaba.com/wp-content/uploads/2018/11/innovation2.jpg'
const About = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm">
          <img src={InovationImg} className="img-fluid"/>
        </div>
        <div className="col-sm">
          <h4>What is TEDx?</h4>
          <p>
            In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection. These local, self-organized events are branded TEDx, where x = independently organized TED event. The TED Conference provides general guidance for the TEDx program, but individual TEDx events are self-organized. ( .Subject to certain rules and regulations.)
          </p>
          <h4>What is TEDx Yaba?</h4>
          <p>
            TEDx Yaba is an independently organised TED-like event in the heart of Yaba, Lagos, the birthplace of Nigeria’s tech renaissance. It is a convening of ideas and technocrats focused on how to keep the evolving Nigerian condition on the path of progress. TEDx Yaba is a yearly event and registration for admittance is free.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
