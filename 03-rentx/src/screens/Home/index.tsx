import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import {
  PanGestureHandler,
  RectButton
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  // withSpring,
} from "react-native-reanimated";
import { useTheme } from "styled-components";

import LogoSvg from '../../assets/logo.svg';
import { CarDTO } from "../../global/dtos/CarDTO";
import { CarCard } from "../../components/CarCard";
import { AppLoader } from "../../components/AppLoader";
import { api } from "../../services/api";
import { AppStackParamList } from "../../routes/stack.routes";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type HomeScreenProp = StackNavigationProp<AppStackParamList, 'Home'>;

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProp>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isFetchingCars, setIsFetchingCars] = useState(true);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      // positionX.value = withSpring(0);
      // positionY.value = withSpring(0);
    },
  });

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');

        setCars(response.data);
      } catch(err) {
        console.log(err);
        Alert.alert("Erro inesperado ao buscar carros")
      } finally {
        setIsFetchingCars(false);
      }
    }

    fetchCars()
  }, []);

  function handleShowCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleShowMyCars() {
    navigation.navigate('MyCars');
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Header>
          <HeaderContent>
            <LogoSvg
              width={RFValue(108)}
              height={RFValue(12)}
            />
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          </HeaderContent>
        </Header>

        {
          isFetchingCars ? (
            <AppLoader />
          ) : (
            <FlatList
              data={cars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CarCard
                  data={item}
                  onPress={() => handleShowCarDetails(item)}
                />
              )}
              contentContainerStyle={{
                padding: 24,
              }}
              showsVerticalScrollIndicator={false}
            />
          )
        }
        
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
        >
          <Animated.View
            style={[
              myCarsButtonContainerStyle,
              styles.myCarsButtonContainer,
            ]}
          >
            <ButtonAnimated
              style={[
                styles.myCarsButton,
                {
                  backgroundColor: theme.colors.main,
                },
              ]}
              onPress={handleShowMyCars}
            >
              <Ionicons
                name="ios-car-sport"
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  myCarsButtonContainer: {
    position: 'absolute',
    right: RFValue(22),
    bottom: RFValue(13),
  },
  myCarsButton: {
    justifyContent: 'center',
    alignItems: 'center',
  
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(30),
  }
})