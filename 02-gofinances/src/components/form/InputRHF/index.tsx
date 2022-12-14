import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';

import {
  Container,
  Error,
} from "./styles";

interface Props extends TextInputProps {
  control: Control<any>;
  name: string;
  error: string | undefined;
};

export function InputRHF({ control, name, error, ...rest }: Props ) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      { error && <Error>{error}</Error>}
    </Container>
  );
}
