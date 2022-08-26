import { eachDayOfInterval, format } from 'date-fns';

import { MarkedDateProps, DayProps } from '.';
import { theme } from '../../global/styles/theme';
import { getPlatformDate } from './getPlatformDate';

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  const intervalDays = eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  });
  
  intervalDays.forEach(( item ) => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    const isEdgeDate = [start.dateString, end.dateString].includes(date);

    interval = {
      ...interval,
      [date]: {
        color: isEdgeDate
          ? theme.colors.main : theme.colors.light_main,
        textColor: isEdgeDate
          ? theme.colors.light_main : theme.colors.main,
      }
    }
  });

  return interval;
}