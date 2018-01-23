import _ from 'lodash';
import moment from 'moment';

//This method will generate an array of weeks which is an array of days
export const generateMonthArray = date => {
  const monthStart = date.clone().startOf('month');
  const monthEnd = date.clone().endOf('month');
  const monthArray = [];

  do monthArray.push(generateWeekArray(monthStart));
  while (monthStart.add(1, 'weeks').diff(monthEnd.clone().endOf('week')) < 0);

  return monthArray;
};

//This method flattens array of weeks into array of days
export const generateMonthArrayFlatten = date =>
  _.flatten(generateMonthArray(date));

//returns array of weeks short name
export const weekShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const generateWeekArray = date => {
  const weekStart = date.clone().startOf('week');
  const weekEnd = date.clone().endOf('week');
  const weekArray = [];
  do weekArray.push(weekStart.clone());
  while (weekStart.add(1, 'days').diff(weekEnd) < 0);

  return weekArray;
};

export const generateDayArray = date => {
  const dayStart = date.clone().startOf('day');
  const dayEnd = date.clone().endOf('day');
  const dayArray = [];
  do dayArray.push(dayStart.clone());
  while (dayStart.add(1, 'hours').diff(dayEnd) < 0);

  return dayArray;
};

export const groupEvents = (events, format = 'l') =>
  _.groupBy(events, event => moment(event.startDate).format(format));
