import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";

import { BaseScreen } from "../../components/BaseScreen";
import { HistoryCard } from "../../components/HistoryCard";
import { TRANSACTIONS_COLLECTION } from "../../global/configs/storage";
import { categories } from "../../global/utils/categories";
import { formatNumberToCurrency } from "../../global/utils/formatters";
import { Transaction } from "../Dashboard";

import {
  Content
} from "./styles";

interface CategoryWithTotal {
  id: string;
  name: string;
  color: string;
  formattedTotal: string;
}

export function Summary() {
  const [categoriesWithTotal, setCategoriesWithTotal] = useState<CategoryWithTotal[]>([]);

  async function loadTransactions() {
    const data = 
      await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

    if (data !== null) {

      let loadedTransactions = JSON.parse(data) as Transaction[];

      const categoriesWithTotal = categories
        .reduce<CategoryWithTotal[]>((list, category) => {
          let categoryTotal = loadedTransactions.reduce(
            (total, transaction) => {
              if (transaction.categoryId === category.id) {
                if (transaction.type === 'deposit') {
                  return total + Number(transaction.amount);
                } else {
                  return total - Number(transaction.amount);
                }
              }

              return total;
            }, 0);

          const formattedCategoryTotal = formatNumberToCurrency(categoryTotal);

          if (categoryTotal === 0) {
            return list;
          }
          else {
            const categoryWithTotal = {
              id: category.id,
              name: category.name,
              color: category.color,
              formattedTotal: formattedCategoryTotal,
            };

            list.push(categoryWithTotal);

            return list;
          }
        }, []);

      setCategoriesWithTotal(categoriesWithTotal);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <BaseScreen title="Resumo por categoria">
      <Content
        contentContainerStyle={{ flex: 1, padding: 24 }}
      >
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
    </BaseScreen>
  );
}
