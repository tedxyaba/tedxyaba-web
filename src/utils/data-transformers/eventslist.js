import moment from 'moment';
import TransformEventData from './events';

const TransformEventsListData = (data) => {
  const raw_events_list = data.results
  const transformedEvents = raw_events_list.map(event => TransformEventData(event))
  return transformedEvents.sort((a,b) => moment(b.eventDate) - moment(a.eventDate))
}

export default TransformEventsListData
