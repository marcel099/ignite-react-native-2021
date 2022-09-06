import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";

import { getAccessoryIcon } from '../../global/utils/getAccessoryIcon';
import { AppHomeStackScreenProp } from "../../routes/appHome.stack.routes";
import { formatNumberToCurrency } from '../../utils/formatters';

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from "./styles";

export function CarDetails() {
  const navigation =
    useNavigation<AppHomeStackScreenProp<'CarDetails'>['navigation']>();
  const route =
    useRoute<AppHomeStackScreenProp<'CarDetails'>['route']>();
  const { car } = route.params;
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  

  const statusBarHeight = getStatusBarHeight();

  const animatedHeaderHeight = statusBarHeight
    + 31    // top margin from back button
    + 24    // back button height
    + 132   // car image height
    + 35;   // padding in between car image and car details

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, animatedHeaderHeight],
        [animatedHeaderHeight, statusBarHeight],
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleGoBackHome() {
    navigation.pop();
  }

  function handleShowScheduling() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Animated.View
          style={[
            headerStyleAnimation,
            styles.animatedHeader,
            { backgroundColor: theme.colors.background_secondary }
          ]}
          >
          <Header>
            <Animated.View style={sliderCarsStyleAnimation}>
              <ImageSlider
                images={car.photos}
                handleGoBack={handleGoBackHome}
              />
            </Animated.View>
          </Header>
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: animatedHeaderHeight,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{formatNumberToCurrency(car.price)}</Price>
            </Rent>
          </Details>

          <Accessories>
            {
              car.accessories.map(accessory => (
                <Accessory
                  key={accessory.id}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>

          <About>{ car.about }</About>
        </Animated.ScrollView>

        <Footer>
          <Button
            title="Escolher período de aluguel"
            onPress={handleShowScheduling}
          />
        </Footer>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  animatedHeader: {
    position: 'absolute',
    zIndex: 2,
    overflow: 'hidden',
  },
})
