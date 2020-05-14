const about = [
  {
    id: 'ted',
    title: 'What is TED?',
    content: 'TED is a nonprofit organization devoted to Ideas Worth Spreading, usually in the form of short, powerful talks (18 minutes or fewer) delivered by today’s leading thinkers and doers.\n\nMany of these talks are given at TED’s annual conference in Vancouver, British Columbia, and made available, free, on TED.com. TED speakers have included Bill Gates, Jane Goodall, Elizabeth Gilbert, Sir Richard Branson, Monica Lewinsky, Philippe Starck, Ngozi Okonjo-Iweala, Sal Khan and Daniel Kahneman.'
  },
  {
    id: 'tedx',
    title: 'What is TEDx?',
    content: 'In the spirit of “ideas worth spreading,” TED has created TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.\n\nOur event is called TEDxYaba, where x = independently organized TED event. At TEDxYaba, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.'
  },
  {
    id: 'tedxyaba',
    title: 'What is TEDxYaba?',
    content: 'TEDxYaba is an independently organized TED event in the heart of Yaba, Lagos, the centre of Africa’s largest technology ecosystem.\n\nOur vision is to be the foremost platform for African ideas on the continent and, every year, we curate conversations that we hope would catalyse and inspire further corresponding actions capable of setting Africa on course to a more sustainable future.'
  }
];

const events = [
  // {
  //   id: 'event-id-01',
  //   title: 'Bold + Brilliant',
  //   category: 'TEDxYabaWomen',
  //   datetime: "2020-03-14T10:00:00.000Z",
  //   description: 'The 2019 TEDxYabaWomen event in line with the global TEDWomen2019 is themed Bold+Brilliant. We believe this is our year to be bold and brilliant – without apology.\n\nAt the TEDxYabaWomen 2019, we will be shining a spotlight on dazzling ideas from some of Nigeria’s most extraordinary risk-takers and innovators. Women who are making power moves, brilliant people who are just getting started and those like you, who tirelessly show up as allies and advocates in your industry. It is going to be a magical moment of celebration, sharing of thought-provoking stories and connection',
  //   venue: 'Itanna Accelerator, 2 Abebe Village Rd, Iganmu, Surulere. Lagos',
  // },
  // {
  //   id: 'event-id-02',
  //   title: 'Forecasts: Stomachs & Infrastructure',
  //   category: 'TEDxYabaSalon',
  //   datetime: "2019-11-02T11:00:00.000Z",
  //   description: 'On 2nd November, 2019 the final TEDxYabaSalon event for the year will attempt to address the topic of sustainability and viability of Nigeria’s agricultural sector which in recent times has been touted as the answer to reviving the nation’s failing economy.',
  //   venue: '10, Hughes Avenue, Off Herbert Macaulay Way, Yaba 101212, Lagos',
  // },
];

const talks = [
  {
    id: 'talk-id-01',
    event_id: 2,
    speaker: {
      name: 'Seni Sulyman',
      twitter_handle: '',
      linkedin_url: ''
    },
    topic: 'Africa can lead the world. But, will we?',
    video_url: 'https://youtu.be/4U6nOfSvg28',
    video_duration: "PT8M02S",
    date: '2017-10-10',
  },
  {
    id: 'talk-id-02',
    event_id: 2,
    speaker: {
      name: 'TY Bello',
      twitter_handle: '',
      linkedin_url: ''
    },
    topic: 'Beauty does have a place',
    video_url: 'https://youtu.be/JAszBCAwGyo&t=6s',
    video_duration: "PT15M59S",
    date: '2017-10-10',
  },
  {
    id: 'talk-id-03',
    event_id: 1,
    speaker: {
      name: 'Folakunle Oshun',
      twitter_handle: '',
      linkedin_url: ''
    },
    topic: 'The hidden truth about Jollof rice',
    video_url: 'https://youtu.be/V5W8Qlde3NQ',
    video_duration: "PT16M22S",
    date: '2018-08-10',
  },
  {
    id: 'talk-id-04',
    event_id: 3,
    speaker: {
      name: 'Ade Balogun',
      twitter_handle: '',
      linkedin_url: ''
    },
    topic: 'The Hair Revolution',
    video_url: 'https://youtu.be/HfuNka7ErIs',
    video_duration: "",
    date: '2016-10-11',
  }
];

const team = [
  {
    id: 'intro',
    title: 'Our Team',
    content: 'TEDxYaba’s core organizing committee is a group of passionate volunteers from a variety of disciplines who are dedicated to the TED mission of giving voice to ideas worth spreading.\n\nClick on the images to learn more about each team member.'
  },
  {
    id: 'team-id-01',
    first_name: 'Sunday',
    last_name: 'Adefila',
    role: 'Senior Backend Engineer',
    image_url: '',
    linkedin_url: '',
    twitter_handle: '',
    bio: 'Call me, geng leader.',
  },
];

const socials = [
  {
    id: 'twitter',
    url: 'https://twitter.com/tedxyaba',
    icon_name: 'twitter',
    font: 'Entypo',
    color: '#03a9f4',
    size: 15,
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/tedxyaba/',
    icon_name: 'social-instagram',
    font: 'SimpleLineIcons',
    color: '#ffffff',
    size: 11,
  },
  {
    id: 'facebook',
    url: 'https://web.facebook.com/TEDxYaba/',
    icon_name: 'facebook',
    font: 'FontAwesome',
    color: '#ffffff',
    size: 12,
  },
];

export default {
  about,
  // events,
  talks,
  team,
  socials,
}
