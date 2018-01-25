import _ from 'lodash';
import moment from 'moment';

const TIME_HEIGHT_RATIO = 0.83;

export const getMonthStart = date => date.clone().startOf('month');
export const getWeekStart = date => date.clone().startOf('week');
export const getDayStart = date => date.clone().startOf('day');
export const getMonthEnd = date => date.clone().endOf('month');
export const getWeekEnd = date => date.clone().endOf('week');
export const getDayEnd = date => date.clone().endOf('day');
export const getMinute = date => date.get('minute');
export const getHour = date => date.get('hour');

//This method will generate an array of hours in a day
export const generateDayArray = date => {
  const dayStart = getDayStart(date);
  const dayEnd = getDayEnd(date);
  const dayArray = [];
  do dayArray.push(dayStart.clone());
  while(dayStart.add(1, 'hours').diff(dayEnd) < 0);

  return dayArray;
};

//This method will generate an array of days in a week
export const generateWeekArray = date => {
  const weekStart = getWeekStart(date)
  const weekEnd = getWeekEnd(date);
  const weekArray = [];
  do
    weekArray.push(weekStart.clone());
  while(weekStart.add(1, 'days').diff(weekEnd) < 0);

  return weekArray;
};

//This method will generate an array of weeks which is an array of days
export const generateMonthArray = date => {
  const monthStart = getMonthStart(date);
  const monthEndWeek = getWeekEnd(getMonthEnd(date));
  const monthArray = [];

  do
    monthArray.push(generateWeekArray(monthStart));
  while(monthStart.add(1, 'weeks').diff(monthEndWeek) < 0);

  return monthArray;
};

//returns array of weeks short name
export const weekShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const groupEvents = (events, format = 'l') => _.groupBy(events, event => moment(event.startDate).format(format));

export const findEventsInADay = (events, day) => {
  return _.filter(events, event => moment(event.startDate).isSame(day, 'day'));
};

//This method will return position and height of event corresponding to its start and end time
export const getEventPosition = (start, end) => {
  const startHeight = (getHour(start)*60 + getMinute(start)) * TIME_HEIGHT_RATIO;
  const endHeight = (getHour(end)*60 + getMinute(end)) * TIME_HEIGHT_RATIO;
  const evtHeight = endHeight - startHeight;
  return { top: startHeight, height: evtHeight < 50 ? 50 : evtHeight };
};
