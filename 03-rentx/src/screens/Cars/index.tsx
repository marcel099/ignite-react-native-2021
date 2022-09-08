import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  SyncDatabaseChangeSet,
  synchronize
} from '@nozbe/watermelondb/sync';
import { RFValue } from "react-native-responsive-fontsize";

import { CarCard } from "../../components/CarCard";
import { CarsLoader } from "../../components/CarsLoader";

import LogoSvg from '../../assets/logo.svg';
import { database } from "../../database";
import { Car, CarModelDTO } from "../../database/models/Car";
import { api } from "../../services/api";
import { AppHomeStackScreenProp } from "../../routes/appHome.stack.routes";
import { CarServerDTO } from "../../global/dtos/CarServerDTO";
import { CarMap } from "../../global/mappers/CarMap";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

export function Cars() {
  const navigation =
    useNavigation<AppHomeStackScreenProp<'Cars'>['navigation']>();

  const netInfo = useNetInfo();

  const [cars, setCars] = useState<CarModelDTO[]>([]);
  const [isLoadingCars, setIsLoadingCars] = useState(true);
  const [isSynchronizingCars, setIsSynchronizingCars] = useState(false);

  function handleShowCarDetails(car: CarModelDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<Car>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch(err) {
        console.log(err);
        Alert.alert("Erro inesperado ao buscar carros")
      } finally {
        if (isMounted) {
          setIsLoadingCars(false);
        }
      }
    }
    
    fetchCars();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if (netInfo.isConnected && !isSynchronizingCars) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);


  async function offlineSynchronize() {
    try {
      setIsSynchronizingCars(true);

      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          try {          
            const response = await api.get('/cars');
            const serverCars = response.data as CarServerDTO[];

            const carCollection = database.get<Car>('cars');
            const localCars = await carCollection.query().fetch();

            const carsToCreate: CarModelDTO[] = serverCars
              .filter(
                serverCar => !localCars.some(
                  localCar => serverCar.id === localCar.id
                )
              )
              .map(serverCar => CarMap.fromCarServerToCarModel(serverCar));

            let carsToUpdate: CarModelDTO[] = [];
            let carsIdToDelete: string[] = [];

            if (lastPulledAt !== null) {
              carsToUpdate = serverCars
                .filter(
                  serverCar => localCars.some(
                    localCar => serverCar.id === localCar.id
                      && Number(serverCar.updated_at) >= lastPulledAt
                  )
                )
                .map(serverCar => CarMap.fromCarServerToCarModel(serverCar))

              const carsToDelete = localCars.filter(
                localCar => !serverCars.some(
                  serverCar => serverCar.id === localCar.id
                )
              )

              carsIdToDelete = carsToDelete.map(car => car.id)
            }

            const carsChanges = {
              created: carsToCreate,
              updated: carsToUpdate,
              deleted: carsIdToDelete,
            };

            const currentCars = serverCars
              .map(serverCar => CarMap.fromCarServerToCarModel(serverCar));

            setCars(currentCars);

            return {
              changes: {
                cars: carsChanges,
              } as SyncDatabaseChangeSet,
              timestamp: new Date().getTime()
            };
          } catch (error) {
            console.log('pullChanges error', error);
            return {changes: {}, timestamp: lastPulledAt ?? 1};
          }
        },
        pushChanges: async ({ changes }) => {
          try {
            const user = changes.users;
            console.log(user.updated)
            await api.post('/users/sync', user);
          } catch (error) {
            console.log('pushChanges error', error);
          }
        },
      });

      setIsSynchronizingCars(false);
    } catch(error) {
      console.log(error);
      Alert.alert('Falha ao mostrar carros');
    }
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
            {
              !isLoadingCars && (
                <TotalCars>
                  Total de {cars.length} carros
                </TotalCars>
              )
            }
          </HeaderContent>
        </Header>

        {
          isLoadingCars ? (
            <CarsLoader />
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
      </Container>
    </>
  );
}
