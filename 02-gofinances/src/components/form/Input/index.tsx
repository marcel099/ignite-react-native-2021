import { TextInputProps } from "react-native";

import {
  Container,
} from "./styles";

type Props = TextInputProps & {
  active?: boolean;
};

export function Input({active = false, ...rest}: Props) {
  return (
    <Container active={active} {...rest} />
  );
}
