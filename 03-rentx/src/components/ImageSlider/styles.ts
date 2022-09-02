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

interface ImageIndexProps {
  active: boolean;
}

export const ImageIndex = styled.View<ImageIndexProps>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape
  };

  margin-left: ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
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
