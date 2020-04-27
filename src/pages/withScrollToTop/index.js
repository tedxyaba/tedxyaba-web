import React, { useEffect } from 'react';

const withScrollToTop = (WrappedComponent) => {
  const WithScrollToTop = () => {
    useEffect(() => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })

    return <WrappedComponent />
  }

  WithScrollToTop.displayName = `WithScrollToTop(${getDisplayName(WrappedComponent)})`;
  return WithScrollToTop;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withScrollToTop;
