import TransformEventData from './events';

const TransformEventsListData = (data) => {
  const raw_events_list = data.results
  return raw_events_list.map(event => TransformEventData(event))
}

export default TransformEventsListData
