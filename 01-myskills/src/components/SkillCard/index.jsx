import { Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export function SkillCard({ skill }) {
  return (
    <TouchableOpacity style={styles.skillButton}>
      <Text style={styles.skill}>
        { skill }
      </Text>
    </TouchableOpacity>
  );
}
