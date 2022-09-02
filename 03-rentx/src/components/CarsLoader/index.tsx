import LottieView from 'lottie-react-native'

import CarsAnimation from '../../assets/cars_animation.json';

import {
  Container,
} from "./styles";

export function CarsLoader() {
  return (
    <Container>
      <LottieView
        source={CarsAnimation}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
