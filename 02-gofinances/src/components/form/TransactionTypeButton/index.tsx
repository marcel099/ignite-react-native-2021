import { TouchableOpacityProps } from "react-native";
import { TransactionType } from "../../../screens/Register";

import {
  Container,
  Icon,
  Title,
} from "./styles";

export enum icon {
  deposit = "arrow-up-circle",
  withdraw = "arrow-down-circle",
}

interface Props extends TouchableOpacityProps {
  title: string;
  type: TransactionType;
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container
      isActive={isActive}
      type={type}
      {...rest}
    >
      <Icon
        name={icon[type]}
        type={type}
      />
      <Title>
        {title}
      </Title>
    </Container>
  );
}
