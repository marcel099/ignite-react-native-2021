import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

import { BaseScreen } from "../../components/BaseScreen";
import { HistoryCard } from "../../components/HistoryCard";
import { AppLoader } from "../../components/AppLoader";
import { TRANSACTIONS_COLLECTION } from "../../global/configs/storage";
import { categories } from "../../global/utils/categories";
import { formatNumberToCurrency } from "../../global/utils/formatters";
import { Transaction } from "../Dashboard";

import {
  Content,
  ChartContainer,
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

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [categoriesWithTotal, setCategoriesWithTotal] = useState<CategoryWithTotal[]>([]);

  async function loadTransactions() {
    if (isLoadingTransactions === false) {
      setIsLoadingTransactions(true);
    }

    const data = 
      await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

    if (data !== null) {

      const loadedTransactions = JSON.parse(data) as Transaction[];
      const expenseTransactions = loadedTransactions
        .filter(transaction => transaction.type === 'withdraw');

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
      setIsLoadingTransactions(false);
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <BaseScreen title="Resumo por categoria">
      {
        isLoadingTransactions
        ? (
          <AppLoader />
        ) : (
          <Content
            showVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
              paddingHorizontal: 24,
              paddingBottom: bottomTabBarHeight,
            }}
          >
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
                    color: theme.colors.shape,
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
    </BaseScreen>
  );
}
