import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  skill: string;
}

export function SkillCard({ skill, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.skillButton}
      {...rest}
    >
      <Text style={styles.skill}>
        { skill }
      </Text>
    </TouchableOpacity>
  );
}
