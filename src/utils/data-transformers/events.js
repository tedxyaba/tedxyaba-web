const TransformEventData = (data) => {
  const result = data.results[0];
  const {
    title,
    speakers,
    sponsors,
    description,
    event_image,
    event_venue,
    gallery_images,
    gallery_videos,
    link_to_register,
    event_date_and_time,
    description_summary,
    event_venue_geo_location
  } = result.data;

  const image = {
    url: event_image.url,
    alt: event_image.alt || 'Event Image',
    height: event_image.dimensions.height,
    width: event_image.dimensions.width
  }

  const mapSpeakers = speakers.map(speaker => {
    return {
      name: speaker.speaker_name,
      title: '',
      image: speaker.speaker_image.url,
      linkToBio: ''
    }
  })

  return {
    id: result.id,
    type: result.type,
    tags: result.tags,
    slugs: result.slugs,
    title: title[0].text,
    summary: description_summary,
    image,
    description: description.map(d => d.text),
    eventDate: event_date_and_time,
    speakers: mapSpeakers,
    sponsors,
    gallery_images,
    gallery_videos,
    link_to_register,
    event_venue,
    event_venue_geo_location
  }
}

export default TransformEventData
