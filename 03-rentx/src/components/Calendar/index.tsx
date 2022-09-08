import React from 'react';
import { Feather } from "@expo/vector-icons";
import { 
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps,
} from 'react-native-calendars';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import { ptBrLocaleConfig } from "./localeConfig";
export { generateInterval } from "./generateInterval";
export { getPlatformDate } from "./getPlatformDate";

LocaleConfig.locales['pt-br'] = ptBrLocaleConfig; 

LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={( direction ) => 
        <Feather
          name={direction === 'left' ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.text}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_details,
        paddingBottom: RFValue(10),
        marginBottom: RFValue(10),
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: RFValue(10),
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: RFValue(20),
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: RFValue(-15),
        }
      }}
      minDate={new Date().toJSON()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}
