const TransformAboutpageData = (data) => {
  const result = data.results[0];
  const { display_image, about_sections } = result.data;

  const aboutSections = about_sections.map((data, index) => {
    const title = data.title[0].text
    const description = data.full_description[0].text

    return {
      id: index + 1,
      sectionTitle: title,
      sectionDescription: description
    }
  })

  return {
    id: result.id,
    displayImage: display_image,
    type: result.type,
    tags: result.tags,
    aboutSections
  }
}

export default TransformAboutpageData
