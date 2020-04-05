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

export const YoutubeThumbnail = ({ url }) => {
  return <img src={`http://img.youtube.com/vi/${extractVideoID(url)}/0.jpg`} />
}

const YoutubeEmbed = ({ url, height, width, className }) => {
  const _onReady = (event) => {
    event.target.pauseVideo();
  }

  const opts = {
    height,
    width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      color: 'red',
      controls: 1,
      modestbranding: 1,
    },
  };

  return (
    <YouTube
      videoId={extractVideoID(url)}
      className={className}
      opts={opts}
      onReady={_onReady}
    />
  )
};

YoutubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
