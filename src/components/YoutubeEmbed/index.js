import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const extractVideoID = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
  const match = url.match(regExp);
  
  if ( match && match[7].length === 11 ) {
    return match[7]
  } else if (match && match[7].length > 11) {
    return match[7].split('&')[0]
  } else {
    return url
  }
}

export const YoutubeThumbnail = ({ url }) => {
  return <img src={`https://img.youtube.com/vi/${extractVideoID(url)}/0.jpg`} alt="" />
}

const YoutubeEmbed = ({ url, height, width, className, onReady, onPlay, onPause }) => {
  const _onReady = (event) => {
    event.target.pauseVideo();
    onReady()
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
      onPlay={onPlay}
      onPause={onPause}
    />
  )
};

YoutubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  className: PropTypes.string,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

export default YoutubeEmbed;
