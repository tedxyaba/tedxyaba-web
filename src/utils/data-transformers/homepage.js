const TransformHomepageData = (data) => {
  const result = data.results[0];
  const { tedx_yaba_logo, landing_page_image, current_event_preview } = result.data;

  const logo = {
      url: tedx_yaba_logo.url,
      alt: tedx_yaba_logo.alt || 'TEDxYaba Logo',
      height: tedx_yaba_logo.dimensions.height,
      width: tedx_yaba_logo.dimensions.width
  }

  const carouselImages = [
      {
          id: 1,
          url: landing_page_image.url,
          alt: landing_page_image.alt || 'landing-image-1',
          height: landing_page_image.dimensions.height,
          width: landing_page_image.dimensions.width
      }
  ]

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
    currentEvent
  }
}

export default TransformHomepageData
