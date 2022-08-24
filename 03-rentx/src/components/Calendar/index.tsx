import { Feather } from "@expo/vector-icons";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: "Hoje"
}

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
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
    />
  );
}
