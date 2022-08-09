import React, { useState } from 'react';
import {
  FlatList,
  Text, TextInput, View,
} from 'react-native';

import { Button } from '../../components/Button';
import { SkillCard } from '../../components/SkillCard';

import { styles } from './styles';

export function Home() {
  const [mySkills, setMySkills] = useState('');
  const [newSkill, setNewSkill] = useState('');

  function handleAddNewSkill() {
    setMySkills((previousValue) => [...previousValue, newSkill]);
  }

  let greeting = ''; const
    currentHour = new Date().getHours();

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good night';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, Rodrigo
      </Text>
      <Text style={styles.greeting}>
        { greeting }
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <SkillCard skill={item} />}
      />
    </View>
  );
}
