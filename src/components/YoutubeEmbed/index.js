import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const extractVideoID = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if ( match && match[7].length === 11 ) {
    return match[7]
  } else {
    return url
  }
}

const YoutubeEmbed = ({ url }) => {
  const _onReady = (event) => {
    event.target.pauseVideo();
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      color: 'red',
      controls: 1,
      modestbranding: 1,
    },
  };

  return <YouTube videoId={extractVideoID(url)} opts={opts} onReady={_onReady} />;
};

YoutubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
