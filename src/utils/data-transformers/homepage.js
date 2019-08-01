const TransformHomepageData = (data) => {
  const result = data.results[0];
  const {
    tedx_yaba_logo,
    landing_page_images,
    current_event_preview,
    link_to_volunteer_form
  } = result.data;

  const logo = {
      url: tedx_yaba_logo.url,
      alt: tedx_yaba_logo.alt || 'TEDxYaba Logo',
      height: tedx_yaba_logo.dimensions.height,
      width: tedx_yaba_logo.dimensions.width
  }

  const carouselImages = landing_page_images.map((lpi, index) => {
    return {
      id: index + 1,
      url: lpi.image.url,
      alt: lpi.image.alt || 'landing-image',
      height: lpi.image.dimensions.height,
      width: lpi.image.dimensions.width,
      slideLabel: 'First slide label',
      slideText: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }
  })

  const currentEvent = {
      id: current_event_preview.id,
      slug: current_event_preview.slug,
      type: current_event_preview.type,
      tags: current_event_preview.tags
  }

  return {
    id: result.id,
    type: result.type,
    tags: result.tags,
    logo,
    carouselImages,
    currentEvent,
    link_to_volunteer_form
  }
}

export default TransformHomepageData
