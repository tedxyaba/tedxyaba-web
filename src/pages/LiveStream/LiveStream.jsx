import React from 'react';
import './LiveStream.scss';
import Footer from '../../segments/Footer';
import BusinessInsider from '../../assets/images/sponsors/business_insider.png';
import Hingees from '../../assets/images/sponsors/hingees.png';
import PremiumTimes from '../../assets/images/sponsors/premium_times.png';
import YNaija from '../../assets/images/sponsors/ynaija.jpg';
import Zikoko from '../../assets/images/sponsors/zikoko.png';
import Zoom from '../../assets/images/sponsors/zoom.png';
import ThankYou from '../../assets/images/thanks.jpg';
import Brochure from '../../assets/downloadableFiles/Convergence-Event-Brochure.pdf';
import TalkHighlights from '../../assets/downloadableFiles/ConvergenceTalkHighlights.pdf'

const LiveStream = () => {
  return (
    <div className="">
      <div className="container">
        <h2 class='pb-3'>TEDxYaba Convergence Live Stream</h2>
        <iframe title='live-vid' width="100%" height="500" src="https://www.youtube.com/embed/nUsX2c0I_S8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <h4 className='pt-5'>About Convergence</h4>
        <hr align='left' className='mt-0' />
        <div>
          <p><b>A Conversation On Africa’s Collective Future</b></p>
          <p>CONVERGENCE is the 2020 edition of TEDxYaba, an independently organized TED event inspired by its strong roots in Yaba, Lagos -  the centre of Africa’s largest technology ecosystem. In a discourse about Africa’s future, this conference is bringing together some of the finest thinkers and innovators involved in creating impact within Africa to spotlight on how technology can help Africa take advantage of its multi-diversity for better collaboration.</p>
        </div>
        <p><b>You can <a href={Brochure} download>click here to download</a> the digital brochure for the event.</b></p>
        <h4 className='pt-3'>Main Session Video Highlights:</h4>
        <hr align='left' className='mt-0' />

        <ul>
          <li>0:00:00 &#8594; Intro Video</li>
          <li>0:01:00 &#8594; TEDx Intro</li>
          <li>0:02:23 &#8594; Message from Morgan Freeman</li>
          <li>0:04:30 &#8594; TEDxYaba Story/About Convergence</li>
          <li>0:06:42 &#8594; Welcome/Housekeeping</li>
          <li>0:11:13 &#8594; Artists Introduction/Act 1</li>
          <li>0:15:28 &#8594; Speaker 1 (Dr. Lawal Bakare) - Communities: Foundation of Health Security</li>
          <li>0:30:36 &#8594; Act 2</li>
          <li>0:32:27 &#8594; Speaker 2 (Bright Simons) - The Next Viral Apocalypse</li>
          <li>0:47:18 &#8594; Act 3</li>
          <li>0:49:33 &#8594; Speaker 3 (Astrid Haas) - Achieving the Promise of Cities that Work</li>
          <li>1:03:51 &#8594; Break</li>
          <li>1:08:23 &#8594; Act 4</li>
          <li>1:10:24 &#8594; Speaker 4 (Andrew S. Nevin, PhD) - Shifting from a GDP Lens to the SDG Lens</li>
          <li>1:22:55 &#8594; Act 5</li>
          <li>1:27:02 &#8594; Speaker 5 (Dr. Charles Omole) - Promoting a Pan-African Security Cooperation & Convergence; <a href={TalkHighlights} download>download highlights</a></li>
          <li>1:40:22 &#8594; Act 6</li>
          <li>1:42:12 &#8594; Speaker 6 (Lola Omolola) - Interview on the Power of Community in Transforming Africa</li>
          <li>2:11:43 &#8594; Break</li>
          <li>2:12:06 &#8594; Closing/Vote of Thanks</li>
          <li>2:21:07 &#8594; Arts Compilation</li>
        </ul>

        <h4 className='pt-3'>Other TED Talks played during the event:</h4>
        <hr align='left' className='mt-0' />

        <ul>
          <li>How augmented reality is changing activism <a href='https://www.ted.com/talks/glenn_cantave_how_augmented_reality_is_changing_activism' target='_blank'>on ted.com</a></li>
          <li>The symbols of systemic racism -- and how to take away their power <a href='https://www.ted.com/talks/paul_rucker_the_symbols_of_systemic_racism_and_how_to_take_away_their_power' target='_blank'>on ted.com</a></li>
          <li>The danger of silence <a href='https://www.ted.com/talks/clint_smith_the_danger_of_silence' target='_blank'>on ted.com</a></li>
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
