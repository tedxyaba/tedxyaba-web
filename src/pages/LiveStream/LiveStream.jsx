import React from 'react';
import './LiveStream.scss';
import Footer from '../../segments/Footer';
import BusinessInsider from '../../assets/images/sponsors/business_insider.png';
import Hingees from '../../assets/images/sponsors/hingees.png';
import PremiumTimes from '../../assets/images/sponsors/premium_times.png';
import YNaija from '../../assets/images/sponsors/ynaija.jpg';
import Zikoko from '../../assets/images/sponsors/zikoko.png';
import Zoom from '../../assets/images/sponsors/zoom.png';
import Brochure from '../../assets/downloadableFiles/Convergence-Event-Brochure.pdf';
import TalkHighlights from '../../assets/downloadableFiles/ConvergenceTalkHighlights.pdf'

const LiveStream = () => {
  return (
    <div className="">
      <div className="container">
        <h2 class='pb-3'>TEDxYaba Convergence Live Stream</h2>
        <iframe title='live-vid' width="100%" height="500" src="https://www.youtube.com/embed/RU_BQApFf04" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <h4 className='pt-5'>About Convergence</h4>
        <hr align='left' className='mt-0' />
        <div>
          <p><b>A Conversation On Africa’s Collective Future</b></p>
          <p>CONVERGENCE is the 2020 edition of TEDxYaba, an independently organized TED event inspired by its strong roots in Yaba, Lagos -  the centre of Africa’s largest technology ecosystem. In a discourse about Africa’s future, this conference is bringing together some of the finest thinkers and innovators involved in creating impact within Africa to spotlight on how technology can help Africa take advantage of its multi-diversity for better collaboration.</p>
        </div>
        <p><b>You can <a href={Brochure} download>click here to download</a> the digital brochure for the event.</b></p>
        <h4 className='pt-3'>Schedule for the day:</h4>
        <hr align='left' className='mt-0' />

        <ul>
          <li>12:00PM - 12:15PM WAT - Opening</li>
          <li>
            12:15PM - 1:35PM WAT - Session 1
            <ul>
              <li>Speaker 1 &#8594; Dr Lawal Bakare</li>
              <li>Speaker 2 &#8594; Bright Simons</li>
              <li>Speaker 3 &#8594; Astrid Haas</li>
              <li>Breakout session
                <ul>
                  <li><a href='https://tedxyaba.zoom.us/j/98997517428' target='_blank'>Breakout room 1</a> &#8594; Fighting off Pandemics: Community Defense vs Herd Immunity (Dr Lawal Bakare)</li>
                  <li><a href='https://tedxyaba.zoom.us/j/94687921485' target='_blank'>Breakout room 2</a> &#8594; Trust and entrepreneurship in Africa (Bright Simons)</li>
                  <li><a href='https://tedxyaba.zoom.us/j/93576740090' target='_blank'>Breakout room 3</a> &#8594; Do Rural spaces need to continue to shrink for Urbanisation? (Astrid Haas)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            1:35PM - 2:55PM WAT - Session 2
            <ul>
              <li>Speaker 4 &#8594; Andrew Nevin</li>
              <li>Speaker 5 &#8594; Dr Charles Omole (<a href={TalkHighlights} download>download highlights</a>)</li>
              <li>Speaker 6 &#8594; Lola Omolola (interviewed by Abosede George-Ogan)</li>
              <li>Breakout session
                <ul>
                  <li><a href='https://tedxyaba.zoom.us/j/98125039425' target='_blank'>Breakout room 4</a> &#8594; First there were MDGs, now there are SDGs. What’s next? (Andrew S. Nevin)</li>
                  <li><a href='https://tedxyaba.zoom.us/j/93647575804' target='_blank'>Breakout room 5</a> &#8594; Is a Pan African Security commission a myth? (Dr Charles Omole)</li>
                  <li><a href='https://tedxyaba.zoom.us/j/97965166920' target='_blank'>Breakout room 6</a> &#8594; The FAQs in building sustainable communities (Lola Omolola)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>2:55PM - 3:00PM WAT - Closing</li>
        </ul>

        <div className="sub-section sponsors-list">
          <h4 className="pt-3">Sponsors</h4>
          <hr align='left' className='mt-0' />
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
              <img src={Hingees} width='150' />
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
              <img src={PremiumTimes} width='150' />
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
              <img src={YNaija} width='150' />
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
              <img src={BusinessInsider} width='150' />
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
              <img src={Zikoko} width='150' />
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
              <img src={Zoom} width='150' />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LiveStream
