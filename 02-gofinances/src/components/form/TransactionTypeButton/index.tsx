import { RectButtonProps } from "react-native-gesture-handler";
import { TransactionType } from "../../../screens/Register";

import {
  Container,
  Button,
  Icon,
  Title,
} from "./styles";

export enum icon {
  deposit = "arrow-up-circle",
  withdraw = "arrow-down-circle",
}

interface Props extends RectButtonProps {
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
    >
      <Button {...rest}>
        <Icon
          name={icon[type]}
          type={type}
        />
        <Title>
          {title}
        </Title>
      </Button>
    </Container>
  );
}
