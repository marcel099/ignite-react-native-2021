import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { NonAuthStackScreenProp } from '../../routes/nonAuth.stack.routes';

import {
  Container,
} from "./styles";

export function Splash() {
  const navigation =
    useNavigation<NonAuthStackScreenProp<'Confirmation'>['navigation']>();

  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 100],
        [1, 0]
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 100],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50, 100],
        [0, .3, 1]
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate('SignIn')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      100,
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    );
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Animated.View style={[brandStyle, { position: 'absolute' }]}>
          <BrandSvg width={80} height={50} />
        </Animated.View>

        <Animated.View style={[logoStyle, { position: 'absolute' }]}>
          <LogoSvg width={180} height={20} />
        </Animated.View>
      </Container>
    </>
  );
}
