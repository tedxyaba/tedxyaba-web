const TransformEventData = (event) => {
  const {
    title,
    speakers,
    sponsors,
    description,
    event_type,
    event_image,
    event_venue,
    gallery_images,
    gallery_videos,
    link_to_register,
    event_date_and_time,
    description_summary,
    event_venue_geo_location
  } = event.data;

  const image = {
    url: event_image.url,
    alt: event_image.alt || 'Event Image',
    height: event_image.dimensions.height,
    width: event_image.dimensions.width,
    thumbnail_list_url: event_image.thumbnail && event_image.thumbnail.url
  }

  const mapSpeakers = speakers.map(speaker => {
    return {
      name: speaker.speaker_name[0].text,
      title: speaker.role_title[0].text,
      image: {
        url: speaker.speaker_image.url,
        alt: speaker.speaker_image.alt,
        ...speaker.speaker_image.dimensions
      },
      linkToBio: {...speaker.link_to_bio}
    }
  })

  const mapSponsors = sponsors.map(sponsor => {
    return {
      name: sponsor.sponsor_name[0].text,
      image: {
        url: sponsor.sponsor_image.url,
        alt: sponsor.sponsor_image.alt,
        ...sponsor.sponsor_image.dimensions
      },
      linkToBio: {...sponsor.link_to_bio}
    }
  })

  return {
    id: event.id,
    type: event.type,
    event_type,
    tags: event.tags,
    slugs: event.slugs,
    title: title[0].text,
    summary: description_summary,
    image,
    description: description.map(d => d.text),
    eventDate: event_date_and_time,
    speakers: mapSpeakers,
    sponsors: mapSponsors,
    gallery_images,
    gallery_videos,
    link_to_register,
    event_venue: event_venue[0].text,
    event_venue_geo_location
  }
}

export default TransformEventData
