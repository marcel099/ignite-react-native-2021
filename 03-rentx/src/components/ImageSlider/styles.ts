import { Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(31)}px;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
`;

export const CarImageWrapper = styled.View`
  justify-content: center;
  align-items: center;

  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;

  margin-bottom: ${RFValue(35)}px;
`;

export const CarImage = styled.Image`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
