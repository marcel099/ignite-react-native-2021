import { useCallback, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { subMonths, addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { AppScreenHeader } from "../../components/AppScreenHeader";
import { HistoryCard } from "../../components/HistoryCard";
import { AppLoader } from "../../components/AppLoader";
import { useTransactions } from '../../contexts/TransactionsContext';
import { categories } from "../../global/utils/categories";
import { formatNumberToCurrency } from "../../global/utils/formatters";
import { Transaction } from "../Dashboard";

import {
  Container,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  MonthName,
} from "./styles";

interface CategoryWithTotal {
  id: string;
  name: string;
  color: string;
  total: number;
  formattedTotal: string;
  percent: string;
}

export function Summary() {
  const theme = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { USER_TRANSACTIONS_COLLECTION } = useTransactions();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [categoriesWithTotal, setCategoriesWithTotal] = useState<CategoryWithTotal[]>([]);

  async function loadTransactions() {
    if (isLoadingTransactions === false) {
      setIsLoadingTransactions(true);
    }

    if (USER_TRANSACTIONS_COLLECTION === null) {
      setIsLoadingTransactions(false);
      Alert.alert(
        "Erro no carregamento",
        "A lista de transações não pôde ser obtida."
      );
      
      return;
    }

    const data = 
      await AsyncStorage.getItem(USER_TRANSACTIONS_COLLECTION);

    if (data !== null) {

      const loadedTransactions = JSON.parse(data) as Transaction[];
      const expenseTransactions = loadedTransactions
        .filter(transaction => transaction.type === 'withdraw')
        .filter(transaction => {
          let date = new Date(transaction.date);

          if (date.getFullYear() === selectedDate.getFullYear()
           && date.getMonth() === selectedDate.getMonth()) {
            return true;
          } else {
            return false;
          }
        });

      const expenseTotal = expenseTransactions
        .reduce<number>((total, transaction) => {
          return total + Number(transaction.amount);
        }, 0)

      const categoriesWithTotal = categories
        .reduce<CategoryWithTotal[]>((list, category) => {
          const categoryTotal = expenseTransactions.reduce(
            (total, transaction) => {
              if (transaction.categoryId === category.id) {
                return total + Number(transaction.amount);
              }

              return total;
            }, 0);

          if (categoryTotal === 0) {
            return list;
          }
          else {
            const formattedCategoryTotal =
              formatNumberToCurrency(categoryTotal);
            
            const categoryPercent =
              `${(categoryTotal / expenseTotal * 100).toFixed(1)}%`;

            const categoryWithTotal = {
              id: category.id,
              name: category.name,
              color: category.color,
              total: categoryTotal,
              formattedTotal: formattedCategoryTotal,
              percent: categoryPercent,
            };

            list.push(categoryWithTotal);

            return list;
          }
        }, []);

      setCategoriesWithTotal(categoriesWithTotal);
    }

    setIsLoadingTransactions(false);
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, [selectedDate]));

  function handleDateChange(action: 'previous' | 'next') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <AppScreenHeader title="Resumo por categoria" />
      {
        isLoadingTransactions
        ? (
          <AppLoader />
        ) : (
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
              paddingHorizontal: RFValue(24),
              marginBottom: RFValue(bottomTabBarHeight),
            }}
          >
            <MonthSelect>
              <MonthSelectButton
                onPress={() => handleDateChange('previous')}
              >
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              
              <MonthName>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </MonthName>

              <MonthSelectButton
                onPress={() => handleDateChange('next')}
              >
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={categoriesWithTotal}
                x="percent"
                y="total"
                colorScale={categoriesWithTotal.map(({ color }) => color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  }
                }}
                labelRadius={80}
              />
            </ChartContainer>
            {
              categoriesWithTotal.map((category) => (
                <HistoryCard
                  key={category.id}
                  title={category.name}
                  amount={category.formattedTotal}
                  color={category.color}
                />
              ))
            }
          </Content>
        )
      }
    </Container>
  );
}
