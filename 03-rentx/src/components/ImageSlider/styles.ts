import { Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;

  padding-right: ${RFValue(24)}px;
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
`;

export const CarImage = styled.Image`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
